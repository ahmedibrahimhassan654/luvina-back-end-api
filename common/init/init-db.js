/* eslint-disable no-console */
const mongoose = require('mongoose');

const config = require('../config/config');
/**
 * @function
 * Connecting to Mongo DB.
 */
const connectDB = async () => {
  const conn = await mongoose.connect(config.db.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
