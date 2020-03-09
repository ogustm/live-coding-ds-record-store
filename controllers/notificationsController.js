const Notification = require('../models/Notification');
const createError = require('http-errors');

exports.getNotifications = async (req, res, next) => {
  // An Admin should get everybody's orders , a user only theirs
  try {
    const notifications = await Notification.find().limit(10);
    res.status(200).send(notifications);
  } catch (e) {
    next(e);
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) throw new createError.NotFound();
    res.status(200).send(notification);
  } catch (e) {
    next(e);
  }
};

// exports.deleteOrder = async (req, res, next) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);
//     if (!order) throw new createError.NotFound();
//     res.status(200).send(order);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.updateOrder = async (req, res, next) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     });
//     if (!order) throw new createError.NotFound();
//     res.status(200).send(order);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.addOrder = async (req, res, next) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(200).send(order);
//   } catch (e) {
//     next(e);
//   }
// };
