const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './whiteboard.sqlite'
});

const Whiteboard = sequelize.define('Whiteboard', {
  roomId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

const db = {
  sequelize,
  Sequelize,
  Whiteboard
};

module.exports = db;