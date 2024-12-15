// inventory-service/db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('luxurystay_inventory', 'root', 'T@vs2022', {
  host: 'localhost',
  dialect: 'mysql'
});

const Room = sequelize.define('Room', {
  room_id: { type: DataTypes.INTEGER, primaryKey: true },
  room_number: DataTypes.INTEGER,
  room_type: DataTypes.STRING,
  status: DataTypes.STRING
}, {
  tableName: 'rooms',
  timestamps: false
});

module.exports = { sequelize, Room };
