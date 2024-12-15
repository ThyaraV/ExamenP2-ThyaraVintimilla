// rest-api/db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('luxurystay_api', 'root', 'T@vs2022', {
  host: 'localhost',
  dialect: 'mysql'
});

const Reservation = sequelize.define('Reservation', {
  reservation_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  room_number: DataTypes.INTEGER,
  customer_name: DataTypes.STRING,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  status: DataTypes.STRING
}, {
  tableName: 'reservations',
  timestamps: false
});

module.exports = { sequelize, Reservation };
