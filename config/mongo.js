const mongoose = require("mongoose");

const connectDB = async () => {
  try {
		await mongoose.connect(process.env.DB_URI);
		console.log("MongoDB is connected");
  } catch (error) {
    console.log("Something went wrong with DB connection");
  }
};

module.exports = connectDB;