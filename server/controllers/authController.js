const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/usersModel');


exports.getAll = async (req, res) => {

  res.send('sdfpnfpnp')
  // try {
  //   const user = await User.find({ email: 'dispe.andrea@gmail.com' });
  //   res.status(200).json(user);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
}

exports.signup = async (req, res) => {
  const { username, email, password} = req.body;

  // VALIDATE INPUT
  // validationResult will check inside the req for the fields and if they respect the specification given in the middleware
  const hasErrors = validationResult(req);
  console.log('hasErrors: ', hasErrors);
  console.log('typeof hasErrors: ', typeof  hasErrors);

  // hasErrors is an array and if it is not empty then returns the error array and display them
  if (!hasErrors.isEmpty()) {
    return res.status(401).json({
      // the method array returns an array with all the validation errors
      errors: hasErrors.array(),
    });
  }

  // VALIDATE USER
  const userInDb = await User.find({ username });
  // if the userInDb already exists throw an error
  if (userInDb[0]) {
    return res.status(400).send({
      errors: [
        {
          msg: 'This user is already registered',
        },
      ],
    });
  }
  // HASH PASSWORD
  // bcrypt.hash takes the password as 1st param and the amount of "salt" as 2nd param
  // NB: bcrypt.hash is an asynchronous function
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashedPassword: ', hashedPassword);
  // Save the user into the DB

  const user = new User({ username, email, password: hashedPassword });
  console.log('saved user: ', user);

  try {
    await user.save();
    //JWT
    // the jsonwebtoken methods are asynchronous
    // the .sign method will create the jwt and accept the payload as 1st param and the secret as 2nd param and object with options as 3rd param
    const token = await JWT.sign(
      {
        username,
      },
      'mysecret',
      {
        expiresIn: 864_000,
      }
    );
    res.status(200).json(token);
  } catch (error) {
    console.log('error: ', error);
    res.status(409).json({ message: error });
  }
}

exports.login = async (req, res) => {
  const { password, username } = req.body;
  const hasErrors = validationResult(req);

  // VALIDATE INPUTS
  if (!hasErrors.isEmpty()) {
    console.log('there are errros')
    console.log('hasErrors.array(): ', hasErrors.array());
    return res.status(401).json({
      errors: hasErrors.array(),
    });
  }

  // VALIDATE USER
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send({
      errors: [
        {
          msg: 'Username or password is incorrect',
        },
      ],
    });
  }

  // VALIDATE PASSWORD
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // SIGN THE JWT
    const token = await JWT.sign({ username }, 'mysecret', {
      expiresIn: 864_000,
    });
    return res.json(token);
  } else {
    return res.status(400).send({
      errors: [
        {
          msg: 'Username or password is incorrect',
        },
      ],
    });
  }
}

exports.checkUsernameExists = async(req, res) => {
  const {username} = req.body;
  const user = await User.findOne({ username });
  user && res.json({
    msg: 'This username is already taken',
    exists: true
  })
  !user && res.json({
    msg: 'This username is available',
    exists: false
  })
}

exports.checkEmailExists = async(req, res) => {
  const {email} = req.body;
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
