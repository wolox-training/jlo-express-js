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
        type: DataTypes.ENUM,
        values: USER_POSITIONS,
        allowNull: false,
        defaultValue: USER_POSITIONS[0],
        set(rating) {
          if (rating >= 50) {
            this.setDataValue('position', USER_POSITIONS[5]);
          } else if (rating >= 30) {
            this.setDataValue('position', USER_POSITIONS[4]);
          } else if (rating >= 20) {
            this.setDataValue('position', USER_POSITIONS[3]);
          } else if (rating >= 10) {
            this.setDataValue('position', USER_POSITIONS[2]);
          } else if (rating >= 5) {
            this.setDataValue('position', USER_POSITIONS[1]);
          } else {
            this.setDataValue('position', USER_POSITIONS[0]);
          }
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
