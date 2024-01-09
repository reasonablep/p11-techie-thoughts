const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Comment extends Model {}

Comment.init(

    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false


        },

        comment: {

            type: DataTypes.TEXT,
            allowNull: false,

        },


        stamp: {

            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('stamp')).format('YYYY-MM-DD');
            }

        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blog',
                key: 'id'
            }

        }

    },

{
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'

}

);

module.exports = Comment;