const { REGULAR_ROLE, ADMIN_ROLE, USER_POSITIONS } = require('../../config/constants');

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
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        get() {
          const rating = this.getDataValue('position');
          if (rating >= 50) {
            return USER_POSITIONS[5];
          } else if (rating >= 30) {
            return USER_POSITIONS[4];
          } else if (rating >= 20) {
            return USER_POSITIONS[3];
          } else if (rating >= 10) {
            return USER_POSITIONS[2];
          } else if (rating >= 5) {
            return USER_POSITIONS[1];
          }
          return USER_POSITIONS[0];
        }
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
