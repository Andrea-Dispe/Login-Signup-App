const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const opts = {
//   // Make Mongoose use Unix time (seconds since Jan 1, 1970)
//   timestamps: { currentTime: () => new Date().toLocaleString() },
// };

const UserVerificationSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  uniqueString: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
},
  // { timestamps: true },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      currentTime: () => new Date().toLocaleString()
    }
  }
)

module.exports = mongoose.model('UserVerification', UserVerificationSchema);
