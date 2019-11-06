const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

exports.getOrders = (req, res, next) => {
  const orders = db.get('orders').value();
  res.status(200).send(orders);
};

exports.addOrder = (req, res, next) => {
  const order = req.body;
  db.get('orders')
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(order);
};
