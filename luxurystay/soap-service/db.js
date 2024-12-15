// soap-service/db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('luxurystay_soap', 'root', 'T@vs2022', {
  host: 'localhost',
  dialect: 'mysql'
});

const Availability = sequelize.define('Availability', {
  room_id: { type: DataTypes.INTEGER, primaryKey: true },
  room_type: DataTypes.STRING,
  available_date: DataTypes.DATEONLY,
  status: DataTypes.STRING
}, {
  tableName: 'availability',
  timestamps: false
});

module.exports = { sequelize, Availability };
