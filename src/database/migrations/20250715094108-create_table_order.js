"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name_customer: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      address_customer: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sub_total: {
         type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0, 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
