const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
  {
    url: String,
    fileName: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Storage', StorageSchema);