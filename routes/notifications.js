const express = require('express');
const router = express.Router();
const {
  getNotifications,
  addNotification,
  getNotification,
  deleteNotification,
  updateNotification
} = require('../controllers/notificationsController');
const auth = require('../middleware/authenticator');

router.route('/').get(getNotifications);
// .post(auth, addNotification);

router.route('/:id').get(auth, getNotification);
// .delete(auth, deleteNotification)
// .put(auth, updateNotification);

module.exports = router;
