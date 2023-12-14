const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData');
const blogData = require('./blogData.json');


const seedBlog = async () => {

            await sequelize.sync({ force: true });
            const addBlog = await User.bulkCreate(userData, {
                individualHooks: true,
                returning: true
    })

    for (const blogs of blogData) {
        await Blog.create({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    };

    process.exit(0);
};
    
    seedBlog();