const express = require('express');
const router = express.Router();
const { getRecords, addRecord } = require('../controllers/recordsController');

/** GET all the records */
router.get('/', getRecords);

/** POST a new record */
router.post('/', addRecord);

module.exports = router;
