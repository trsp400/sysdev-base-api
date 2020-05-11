'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('users', { 
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        data_nascimento: {
          type: DataTypes.STRING,          
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        celular: {
          type: DataTypes.STRING,
          allowNull: false
        },
        endereco: {
          type: DataTypes.STRING,
          allowNull: false
        },
        numero: {
          type: DataTypes.STRING,
          allowNull: false
        },
        bairro: {
          type: DataTypes.STRING,
          allowNull: false
        },
        complemento: {
          type: DataTypes.STRING,
          allowNull: false
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false
        },
        recebe_auxilio: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }

};
