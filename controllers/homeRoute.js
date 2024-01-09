const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            },
            ],

            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]

        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in


        });
        
    } catch (error) {
        res.status(500).json({
        message: 'Error fetching blogs',
        error: error.message
        });
    }

});


router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id,
            {
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'stamp', 'user_id'],
                        include: [
                            {
                                model: User,
                                attributes: ['name']
                            }
                        ]
                    }
                ],
            });

        const blogs = blogData.get({ plain: true });

        console.log(blogs);

        res.render('blog', {
            ...blogs,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error while fetching blog post',
            error: error.message
            });
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {

            attributes: { exclude: ['password'] },
            include: [{ model: Blog }]
        });

        if (!userData) {
            res.redirect('/login');
            return;
        }

        const user = userData.get({ plain: true });

    

        res.render('profile', {
            ...user,
            logged_in: true
        });

    } catch (error) {
        res.status(500).json({
            message: 'Profile could not be retrieved',
            error: error.message
        })
    }
});


router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

module.exports = router;