module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'weet'
    }
  );

  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId' });
    Weet.hasMany(models.Rating);
  };

  return Weet;
};
