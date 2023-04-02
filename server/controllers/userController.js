const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

// MongoDB Models
const User = require('../models/UsersModel');

// Files
const { sendVerificationEmail, handleError, sendPasswordResetEmail } = require('../utils/utils')
const errors = require('../utils/errors')


exports.getUsername = async (req, res) => {
  console.log('req.body: ', req.body);
  const {email} = req.body;
  let user, username;
  try {
    user = await User.findOne({email})
  } catch (error) {
    console.log('error: ', error);
  }
  if(user) {
    username = await user.username
  }
  console.log('user: ', user);
  console.log('username: ', username);
  res.status(200).json({
    status: 'SUCCESS',
    username
  })

}
