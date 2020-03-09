const express = require('express');
const router = express.Router();
const { getPlants, addPlant, getPlant, deletePlant, updatePlant } = require('../controllers/plantsController');
const auth = require('../middleware/authenticator');
const isAdmin = require('../middleware/rolesAuthenticator');

router.route('/').get(auth, getPlants);
// .post(auth, isAdmin, addPlant);

router.route('/:id').get(getPlant);
// .delete(auth, isAdmin, deletePlant)
// .put(auth, isAdmin, updatePlant);

module.exports = router;
