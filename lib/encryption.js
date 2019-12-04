const bcrypt = require('bcrypt');

exports.encrypt = async pass => {
  if (!pass) return '';
  return await bcrypt.hash(pass, 13);
};
