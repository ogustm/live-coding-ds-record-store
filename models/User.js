const mongoose = require('mongoose');
const { Schema } = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    id: false,
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
        _id: false,
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
    .sign({ _id: user._id.toHexString(), access }, 'babylon')
    .toString();

  user.tokens.push({ access, token });

  return token;
};

UserSchema.methods.getPublicFields = function() {
  return {
    _id: this._id,
    lastName: this.lastName,
    firstName: this.firstName,
    email: this.email,
    fullName: this.fullName,
    birthday: new Date(this.birthday),
    address: this.address
  };
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'babylon');
  } catch (err) {
    return;
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access
  });
};

module.exports = mongoose.model('User', UserSchema);
