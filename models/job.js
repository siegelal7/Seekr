module.exports = function (sequelize, DataTypes) {
  const Job = sequelize.define(
    "Job",
    {
      jobName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      starred: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
  //   Job.associate = function (models) {
  //     Job.belongsTo(models.User, {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     });
  //   };
  return Job;
};
