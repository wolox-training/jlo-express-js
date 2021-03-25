module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }),
  down: queryInterface => queryInterface.removeColumn('user', 'position')
};
