const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV;
const database = (NODE_ENV === "test") ? process.env.DB_URI_TEST : process.env.DB_URI;

const connectDB = async () => {
  try {
		await mongoose.connect(database);
		console.log("MongoDB is connected");
  } catch (error) {
    console.log("Something went wrong with DB connection", error);
  }
};

module.exports = connectDB;