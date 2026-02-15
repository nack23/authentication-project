const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;

const connectiondb = async () => {
  try {
    const conn = await mongoose.connect(url);

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);

  } catch (error) {
    console.log("❌ DB Connection Failed");
    console.log(error.message);

    process.exit(1); // app band kar dega
  }
};

module.exports = connectiondb;
