const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleErrorHttp } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const PATH_STORAGE = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({data})
  } catch (error) {
    handleErrorHttp(res, 'Error getting files', 500);
  }
};

const getItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;
    const data = await storageModel.findById(id);
    res.send({data})
  } catch (error) {
    handleErrorHttp(res, 'Error getting file', 500);
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fielData = {
      fileName: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fielData);
    res.status(201).send({data})
  } catch (error) {
    handleErrorHttp(res, 'Error creating file', 401);
  }
};

const deleteItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = body;
    const item = await storageModel.findById(id);
    await storageModel.deleteOne({ _id: id });
    fs.unlinkSync(`${PATH_STORAGE}/${item.fileName}`);
    res.send(true);
  } catch (error) {
    handleErrorHttp(res, 'Error deleting file', 500);
  }
};


module.exports = { createItem, getItems, getItem, deleteItem }