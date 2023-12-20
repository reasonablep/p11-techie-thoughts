const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },

          title: {
            type: DataTypes.STRING,
            allowNull: false
          },

          content: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
              unique: true
            }

          }

    },


    {
        sequelize,
        modelName: 'blog'
    }
);

module.exports = Blog;