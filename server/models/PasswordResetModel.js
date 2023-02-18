const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PssswordResetSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  resetString: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      currentTime: () => new Date().toLocaleString()
    }
  }
)

module.exports = mongoose.model('PasswordReset', PssswordResetSchema);
