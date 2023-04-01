const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const errors = require('../utils/errors');
const UserVerification = require('../models/UserVerificationModel')
const PasswordReset = require('../models/PasswordResetModel')

dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD, EMAIL_HOST } = process.env;

exports.sendVerificationEmail = async ({ _id, username, email }, res) => {
  const currentUrl = "http://localhost:5000";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: EMAIL_HOST,
    to: [email, AUTH_EMAIL],
    subject: `Hey ${username}, please verify your email`,
    text: "TEST TEXT",
    html: `<p>Verify your email</p>
  <div>
    Click on this <a href=${currentUrl}/auth/user-verify/${_id}/${uniqueString}>link</a>
  </div>
  <div>
    This link will expire in 24 hours from the moment you received this email.
  </div>
  `}

  // HASH THE UNIQUE STRING
  let hashedUniqueString;
  try {
    hashedUniqueString = await bcrypt.hash(uniqueString, 10);
  } catch (error) {
    return handleError(res, error, 401, errors.singup.E_SG1004.msg)
  }

  // SAVE THE NEW VERIFICATION
  try {
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      expiresAt: Date.now() + 86_400_000 // 24h
    });
    await newVerification.save();
  } catch (error) {
    return handleError(res, error, 401, errors.singup.E_SG1007.msg)
  }

  // SEND VERIFICATION EMAIL
  let info;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
      }
    })

    info = await transporter.sendMail(mailOptions
    );
  } catch (error) {
    return handleError(res, error, 401, errors.signup.E_SG1005.msg)
  }

  if (info.rejected.length === 0) {
    return true
  } else if (info.rejected.length > 0 || !info) {
    return false
  }
}

exports.sendPasswordResetEmail = async ({ _id, email, username }, redirectUrl, res) => {
  const resetString = uuidv4() + _id;
  console.log('resetString: ', resetString);
  // DELETE ALL THE EXISTING PASSWORD RESET RECORDS ASSOCIATED TO THE EMAIL
  try {
    const countDeletedDocs = await PasswordReset.deleteMany({ userId: _id })
    console.log('countDeletedDocs: ', countDeletedDocs);
  } catch (error) {
    return handleError(res, error, 401, errors.passwordReset.E_PR1004.msg)
  }
  console.log('redirectUrl: ', redirectUrl);

  const mailOptions = {
    from: EMAIL_HOST,
    to: [email, 'dispe.andrea@gmail.com'],
    subject: `Hey ${username}, did you ask to reset your password?`,
    text: "TEST TEXT",
    html: `<p>Password reset procedure</p>
    <div>
     Someone, hopefully you, has requested to reset your account password. If this was not you please ignore this email and your account will be safe.
    </div>
    <div>
      If it was you to request it then click on this <a href=${redirectUrl}/${_id}/${resetString}>link</a>
    </div>
    <div>
      This link will expire in 30 minutes from the moment you received this email.
    </div>
  `}

  // HASH THE RESET STRING
  let hashedResetString;
  try {
    hashedResetString = await bcrypt.hash(resetString, 10);
  } catch (error) {
    return handleError(res, error, 401, errors.passwordReset.E_PR1005.msg)
  }
  console.log('hashedResetString: ', hashedResetString);

  // SAVE THE NEW PASSWORD RESET RECORD INTO THE DB
  try {
    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: hashedResetString,
      expiresAt: Date.now() + 1_800_000 // 30mins
    });
    await newPasswordReset.save();
  } catch (error) {
    return handleError(res, error, 401, errors.passwordReset.E_PR1006.msg)
  }

  // SEND PASSWORD RESET EMAIL
  let info;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
      }
    })

    info = await transporter.sendMail(mailOptions
    );
  } catch (error) {
    return handleError(res, error, 401, errors.passwordReset.E_PR1007.msg)
  }

  if (info.rejected.length === 0) {
    return true
  } else if (info.rejected.length > 0 || !info) {
    return false
  }

}

const handleError = (res, error, statusCode, msg="") => {
  console.error('error: ', error);
  console.log('msg: ', msg);

  if(!msg) {
    return res.status(statusCode).send({
      errors: error
    });
  }

  return res.status(statusCode).send({
    errors: [{
      error,
      msg,
      status: "FAILED"
    }]
  });
}


exports.handleError = handleError;