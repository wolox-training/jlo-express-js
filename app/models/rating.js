module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weetId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: -1,
          max: 1,
          not: 0
        }
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'rating'
    }
  );

  Rating.associate = models => {
    Rating.belongsTo(models.User, { foreignKey: 'userId' });
    Rating.belongsTo(models.Weet, { foreignKey: 'weetId' });
  };

  return Rating;
};
