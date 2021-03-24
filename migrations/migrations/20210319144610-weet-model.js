module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('weet', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    }),
  down: queryInterface => queryInterface.dropTable('weet')
};
