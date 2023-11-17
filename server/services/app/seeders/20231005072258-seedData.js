'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // const users = require(`../data/user_mongo.json`).map((user) => {
    //   delete user.mongoId
    //   user.createdAt = new Date()
    //   user.updatedAt = new Date()
    //   user.password = hashPass(user.password)
    //   return user
    // })

    const categories = require(`../data/category.json`).map((category) => {
      category.createdAt = new Date()
      category.updatedAt = new Date()
      return category
    })

    const products = require(`../data/product.json`).map((product) => {
      delete product.id
      product.createdAt = new Date()
      product.updatedAt = new Date()
      return product
    })
    // await queryInterface.bulkInsert(`Users`, users)
    await queryInterface.bulkInsert(`Categories`, categories)
    await queryInterface.bulkInsert(`Products`, products)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // await queryInterface.bulkDelete(`Users`)
    await queryInterface.bulkDelete(`Categories`)
    await queryInterface.bulkDelete(`Products`)
  }
};
