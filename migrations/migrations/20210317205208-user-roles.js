const { REGULAR_ROLE, ADMIN_ROLE } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user', 'role', {
      type: Sequelize.ENUM,
      values: [REGULAR_ROLE, ADMIN_ROLE],
      allowNull: false,
      defaultValue: 'regular'
    }),
  down: queryInterface => queryInterface.removeColumn('user', 'role')
};
