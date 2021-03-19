const { REGULAR_ROLE, ADMIN_ROLE } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: [REGULAR_ROLE, ADMIN_ROLE],
        allowNull: false,
        defaultValue: 'regular'
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'user'
    }
  );

  User.associate = models => {
    User.hasMany(models.Weet);
  };

  return User;
};
