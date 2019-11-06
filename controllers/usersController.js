const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

exports.getUsers = (req, res, next) => {
  const users = db.get('users').value();
  res.status(200).send(users);
};

exports.addUser = (req, res, next) => {
  const user = req.body;
  db.get('users')
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(user);
};
