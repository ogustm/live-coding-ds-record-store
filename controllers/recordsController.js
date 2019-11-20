const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
/////////////////////////////////
const Record = require('../models/Record');
const createError = require('http-errors');

exports.getRecords = (req, res, next) => {
  const records = db.get('records').value();
  res.status(200).send(records);
};

exports.addRecord = (req, res, next) => {
  const record = req.body;
  db.get('records')
    .push(record)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(record);
};

exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get('records')
    .find({ id })
    .value();

  res.status(200).send(record);
};

exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get('records')
    .remove({ id })
    .write();

  res.status(200).send(record);
};

exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const record = db
    .get('records')
    .find({ id })
    .assign(data)
    .write();

  res.status(200).send(record);
};
