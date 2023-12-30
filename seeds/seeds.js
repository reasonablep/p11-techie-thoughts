const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');


try {

    const seedBlog = async () => {

        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        })

        const blogs = []

        for (const blog of blogData) {
            await Blog.create({
                ...blog,
                user_id: users[Math.floor(Math.random() * users.length)].id,
            })
        };

        for (const comments of commentData) {
            await Comment.create({
                ...comments,
                blog_id: blogs[Math.floor(Math.random() * users.length)].id,
                user_id: users[Math.floor(Math.random() * blogs.length)].id
            })
        }


    }
    seedBlog();
}
catch (error) {
    console.error('Failed to seed DB');
}
