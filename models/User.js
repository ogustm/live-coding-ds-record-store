const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    birthday: {
      type: Date
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: Address,
      required: true
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'x-auth';

  const token = jwt
    .sign({ id: user._id.toHexString(), access }, 'babylon')
    .toString();

  user.tokens.push({ access, token });

  return token;
};

module.exports = mongoose.model('User', UserSchema);
