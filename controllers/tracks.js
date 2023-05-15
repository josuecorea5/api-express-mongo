const { matchedData, body } = require('express-validator');
const { trackModel } = require('../models');
const { handleErrorHttp } = require('../utils/handleError');

const getItems = async (req, res) => {
  try {
    const data = await trackModel.findAllData({});
    res.send({data});
  } catch (error) {
    handleErrorHttp(res, 'Error getting tracks', 404)
  }
};

const getItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;
    const data = await trackModel.findOneData(id);
    res.send({data});
  } catch (error) {
    handleErrorHttp(res, 'Track not found', 404)
  }
};

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await trackModel.create(body);
    res.status(201).send({data});
  } catch (error) {
    handleErrorHttp(res, 'Error creating track', 400)
  }
};

const updateItem = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req);
    const data = await trackModel.findByIdAndUpdate(id, body,{new: true});
    res.send({data});
  } catch (error) {
    handleErrorHttp(res, 'Error updating track', 500);
  }
};

const deleteItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;
    const item = await trackModel.findById(id);
    if (!item) {
      handleErrorHttp(res, 'Track not found', 404);
      return;
    }
    item.isDeleted = true;
    await item.save();
    res.send(true);
  } catch (error) {
    handleErrorHttp(res, 'Error deleting track', 500);
  }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}