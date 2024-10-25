// utils/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database URI
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This enables SSL
      rejectUnauthorized: false // Set to true if you have a valid certificate
    }
  },
  logging: false,
});

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
