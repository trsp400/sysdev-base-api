'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface) => {
      return queryInterface.addColumn(
        'users',
        'avatar_id',
         {
          type: DataTypes.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        }
      )
  },

  down: (queryInterface) => {
      return queryInterface.removeColumn('users','avatar_id');
  }
};
