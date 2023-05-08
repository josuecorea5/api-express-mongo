const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true
    },
    password: String,
    role: {
      type: ['admin', 'user'],
      default: 'user'
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre('find', function() {
  this.where({ isDeleted: false });
})

UserSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

UserSchema.methods.toJSON = function() {
  const { isDeleted,password, ...data } = this.toObject();
  return data;
};

module.exports = mongoose.model('User', UserSchema);