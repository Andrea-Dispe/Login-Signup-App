const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

// MongoDB Models
const User = require('../models/UsersModel');
const UserVerification = require('../models/UserVerificationModel');
const PasswordReset = require('../models/PasswordResetModel');

// Files
const { sendVerificationEmail, handleError, sendPasswordResetEmail } = require('../utils/utils')
const errors = require('../utils/errors')
const { JWT_SECRET } = process.env



exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // VALIDATE INPUT
  const hasErrors = validationResult(req);
  if (!hasErrors.isEmpty()) {
    return handleError(res, hasErrors.array(), 401, 'Some inputs have errors');
  }

  // VALIDATE USER
  let userFromEmail, userFromUsername;
  try {
    userFromEmail = await User.findOne({ email });
    userFromUsername = await User.findOne({ username });
  } catch (error) {
    return handleError(res, error, 500, errors.signup.E_SG1001.msg);
  }
  if (userFromEmail) {
    return handleError(res, errors.signup.E_SG1009.desc, 403, errors.signup.E_SG1009.msg);
  }
  if (userFromUsername) {
    return handleError(res, errors.signup.E_SG1010.desc, 403, errors.signup.E_SG1010.msg);
  }

  // HASH PASSWORD
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return handleError(res, error, 400, errors.signup.E_SG1002.msg);
  }

  // SAVE THE NEW USER INTO THE DB
  const user = new User({ username, email, password: hashedPassword, verified: false });
  let newUser;
  try {
    newUser = await user.save();
    // res.status(200).json({ token });
  } catch (error) {
    return handleError(res, error, 409, errors.signup.E_SG1003.msg);
  }
  const { _id } = newUser;

  // VERIFY USER THROUGH EMAIL
  const isEmailSent = await sendVerificationEmail({ _id, username, email }, res);

  // SEND RESPONSE
  if (isEmailSent) {
    res.status(200).json({
      status: 'PENDING',
      msg: `A verification email has been sent to ${email}.`
    })
  } else {
    handleError(res, errors.signup.E_SG1011.desc, 400, errors.signup.E_SG1011.msg)
  }
}

exports.login = async (req, res) => {
  const { password, username } = req.body;
  const hasErrors = validationResult(req);

  // VALIDATE INPUTS
  if (!hasErrors.isEmpty()) {
    return handleError(res, hasErrors.array(), 401);
  }

  // VALIDATE USER
  let user;
  if (username.includes('@')) {
    try {
      user = await User.findOne({ email: username });
    } catch (error) {
      return handleError(res, error, 500, errors.login.E_LG1001.msg);
    }
  } else {
    try {
      user = await User.findOne({ username });
    } catch (error) {
      return handleError(res, error, 500, errors.login.E_LG1002.msg);
    }
  }

  if (!user) {
    return handleError(res, 'No user found', 403, errors.login.E_LG1003.msg);
  }

  // VALIDATE PASSWORD
  let isPasswordsValid;
  try {
    isPasswordsValid = await bcrypt.compare(password, user.password);
  } catch (error) {
    return handleError(res, error, 500, errors.login.E_LG1005.msg);
  }

  if (!isPasswordsValid) {
    return handleError(res, 'Wrong password provided', 403, errors.login.E_LG1006.msg);
  }

  // CHECK IF USER IS VERIFIED
  if (!user.verified) {
    return handleError(res, 'User not verified yet', 401, errors.login.E_LG1004.msg);
  }

  if (isPasswordsValid) {
    // SIGN THE JWT
    const token = await JWT.sign({
      _id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified
    }, JWT_SECRET, {
      expiresIn: 864_000,
    });


    return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      authenticated: true,
      token,
      result: [{
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified
      }]
    });



    return res.json({
      authenticated: true,
      token,
      result: [{
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified
      }]
    });
  } else {
    return handleError(res, 'User not verified yet', 401, errors.login.E_LG1007.msg);
  }
}

exports.verifyNewUser = async (req, res) => {
  const { userId, uniqueString } = req.params;

  let verification;
  try {
    verification = await UserVerification.findOne({ userId })
  } catch (error) {
    const message = "Error occured while looking for the verification";
    return res.redirect(`/auth/verified/error=true&message=${message}`)
  }

  if (verification) {
    // user verification exist
    const { expiresAt } = verification;

    // CHECK IF VALIDATION EXPIRED
    if (expiresAt < Date.now()) {

      // delete the verification
      try {
        await UserVerification.deleteOne({ userId });
      } catch (error) {
        const message = "An error occurred while clearing the expired verification"
        return res.redirect(`/auth/verified/error=true&message=${message}`)
      }

      // delete the user
      try {
        await User.deleteOne({ _id: userId })
        const message = "Link has expired. Please signup again."
        return res.redirect(`/auth/verified/error=true&message=${message}`)
      } catch (error) {
        const message = "An error occurred while clearing the user"
        return res.redirect(`/auth/verified/error=true&message=${message}`)
      }
    } else {

      // check the uniquer string from the email is the one that is saved into the userVerification document
      const hashedUniqueString = verification.uniqueString;

      let isEmailUniqueStringValid;
      try {
        isEmailUniqueStringValid = await bcrypt.compare(uniqueString, hashedUniqueString)
      } catch (error) {
        const message = "Error occured while trying to hash the unique string"
        return res.redirect(`/auth/verified/error=true&message=${message}`)
      }

      if (isEmailUniqueStringValid) {
        // update the user verified status to true
        try {
          const user = await User.updateOne({ _id: userId }, { verified: true })
        } catch (error) {
          const message = "Error occured while trying to update the user verification status"
          return res.redirect(`/auth/verified/error=true&message=${message}`)
        }

        // delete the userVerification record
        try {
          await UserVerification.deleteOne({ userId });
        } catch (error) {
          const message = "An error occurred while clearing the expired verification"
          return res.redirect(`/auth/verified/error=true&message=${message}`)
        }

        return res.sendFile(path.join(__dirname, "../views/verified.html"))


      } else {
        const message = "The unique string is not valid."
        return res.redirect(`/auth/verified/error=true&message=${message}`)
      }
    }

  } else {
    const message = "Verification has not been started or is already finished"
    return res.redirect(`/auth/verified/error=true&message=${message}`)
  }


}

exports.verifyNewUserLandingPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/verified.html"))
}

exports.checkUsernameExists = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    user && res.json({
      msg: 'This username is already taken',
      exists: true
    })
    !user && res.json({
      msg: 'This username is available',
      exists: false
    })
  } catch (error) {
    return handleError(res, error, 400);
  }
}

exports.checkEmailExists = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  user && res.json({
    msg: 'This email is already taken',
    exists: true
  })
  !user && res.json({
    msg: 'This email is available',
    exists: false
  })
}

exports.requestPasswordReset = async (req, res) => {
  const { email, redirectUrl } = req.body;
  const hasErrors = validationResult(req);

  // VALIDATE INPUTS
  if (!hasErrors.isEmpty()) {
    return handleError(res, hasErrors.array(), 401);
  }

  // CHECK IF USER EXISTS
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return handleError(res, error, 400, errors.passwordReset.E_PR1001.msg);
  }
  if (!user) {
    return handleError(res, errors.passwordReset.E_PR1002.desc, 400, errors.passwordReset.E_PR1002.msg);
  }

  // CHECK IF USER HAS BEEN VERIFIED
  if (!user.verified) {
    return handleError(res, errors.passwordReset.E_PR1003.desc, 400, errors.passwordReset.E_PR1003.msg);
  }

  // SEND PASSWORD RESET EMAIL
  const isEmailSent = await sendPasswordResetEmail(user, redirectUrl, res);

  // SEND RESPONSE
  if (isEmailSent) {
    res.status(200).json({
      status: 'PENDING',
      msg: `An email with the instructions to reset this account's password has been sent to ${email}.`
    })
  } else {
    handleError(res, errors.signup.E_PR1004.desc, 400, errors.signup.E_PR1004.msg)
  }
}

exports.passwordReset = async (req, res) => {
  let { userId, resetString, newPassword } = req.body;

  // GET THE PASSWORD RESET DOC ASSOCIATED TO THE USER ID
  let passwordResetDoc;
  try {
    passwordResetDoc = await PasswordReset.findOne({ userId })
  } catch (error) {
    return handleError(res, error, 400, errors.passwordReset.E_PR1008.msg);
  }
  if (!passwordResetDoc) {
    return handleError(res, '', 400, errors.passwordReset.E_PR1009.msg);
  }

  // CHECK THAT THE PASSWORD RESET IS NOT EXPIRED
  const { expiresAt, } = passwordResetDoc;
  if (expiresAt < Date.now()) {
    try {
      // DELETE THE EXPIRED PASSWORD RESET DOC
      const deletedPasswordResetDoc = await PasswordReset.deleteOne({ userId })
      return handleError(res, errors.passwordReset.E_PR1011.desc, 400, errors.passwordReset.E_PR1011.msg);
    } catch (error) {
      return handleError(res, error, 400, errors.passwordReset.E_PR1010.msg);
    }
  } else {

    // COMPARE THE UNIQUE STRINGS
    let hashedUniqueResetString, isUniqueResetStringValid;
    try {
      hashedUniqueResetString = passwordResetDoc.resetString;
      isUniqueResetStringValid = await bcrypt.compare(resetString, hashedUniqueResetString)
    } catch (error) {
      return handleError(res, error, 400, errors.passwordReset.E_PR1012.msg);
    }
    if (!isUniqueResetStringValid) {
      return handleError(res, errors.passwordReset.E_PR1016.desc, 400, errors.passwordReset.E_PR1016.msg);
    }

    // HASH THE NEW PASSWORD
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      return handleError(res, error, 400, errors.signup.E_PR1013.msg);
    }
    // UPDATE THE USER RECORD WITH THE NEW HASHED PASSWORD
    try {
      const user = await User.findOneAndUpdate({ userId }, { password: hashedPassword })
    } catch (error) {
      return handleError(res, error, 400, errors.signup.E_PR1014.msg);
    }

    // DELETE THE PASSWORD RESET DOCUMENT
    try {
      const deletedPasswordResetDoc = await PasswordReset.deleteOne({ userId })
      return res.status(200).send({
        msg: `Password changed succefully`,
        status: "SUCCESS"
      });
    } catch (error) {
      return handleError(res, error, 400, errors.passwordReset.E_PR1010.msg);
    }
  }
}

