require('dotenv').config();

// MongoDB Models
const User = require('../models/UsersModel');

// Files
const errors = require('../utils/errors')

exports.getUsername = async (req, res) => {
  const {email} = req.body;
  let user, username;
  try {
    user = await User.findOne({email})
  } catch (error) {
    return handleError(res, 'User not verified yet', 401, errors.login.E_U1002.msg);
  }

  if(user) {
    username = await user.username
  }

  res.status(200).json({
    status: 'SUCCESS',
    username
  })
}


exports.deleteAccount = async (req, res) => {
  const { username, email } = req.body;
  try {
    const deletedUser = await User.deleteOne(username ? { username } : { email })

    if (deletedUser.deletedCount > 0) {
      res.status(200).send({
        msg: `This user has been deleted from the DB`,
        status: "SUCCESS"
      });
    } else {
      res.status(202).send({
        msg: `This user does not exist in the DB`,
        status: "FAIL"
      });
    }
  } catch (error) {
    return handleError(res, error, 400, errors.passwordReset.E_U1001.msg);
  }
}