const Plant = require('../models/Plant');
const createError = require('http-errors');

exports.getPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find().select('-__v');
    res.status(200).send(plants);
  } catch (e) {
    next(e);
  }
};

exports.getPlant = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id).select('-__v');
    if (!plant) throw new createError.NotFound();
    res.status(200).send(plant);
  } catch (e) {
    next(e);
  }
};

// exports.deleteRecord = async (req, res, next) => {
//   try {
//     const record = await Record.findByIdAndDelete(req.params.id);
//     if (!record) throw new createError.NotFound();
//     res.status(200).send(record);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.updateRecord = async (req, res, next) => {
//   try {
//     const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     }).select('-__v');
//     if (!record) throw new createError.NotFound();
//     res.status(200).send(record);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.addRecord = async (req, res, next) => {
//   try {
//     const record = new Record(req.body);
//     await record.save();
//     res.status(200).send(record);
//   } catch (e) {
//     next(e);
//   }
// };
