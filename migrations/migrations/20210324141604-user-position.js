const { USER_POSITIONS } = require('../../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user', 'position', {
      type: Sequelize.ENUM,
      values: USER_POSITIONS,
      allowNull: false,
      defaultValue: USER_POSITIONS[0]
    }),
  down: queryInterface =>
    Promise.all([
      queryInterface.removeColumn('user', 'position'),
      queryInterface.dropEnum('enum_user_position')
    ])
};
