const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');


router.get('/:id', async (req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment', 'user_id', 'stamp'],
                    include: [{
                        model: User,
                        attributes: ['name']
                    }]
                }
            ],
        });
        if (!blogData) {
            console.log('No blog post found');
            res.status(404).json({message: 'No blog post found'});
            return;
        }
        console.log('Blog data retrieved', blogData)
        res.status(200).json(blogData.get ({ plain: true }));

} catch (error) {
    console.error('Error', error)
    res.status(500).json(error);
}
});


router.post('/', withAuth, async (req, res) =>{
    try {
        const newBlog = await Blog.create ({
            ...req.body,
            user_id: req.session.user_id,


        });
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog post',
            error: error.message
    })
}
});



router.delete('/:id', withAuth, async (req,res)=> {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        if (!blogData) {
            res.status(404).json({
                message: "No blog found with that ID",
            });
            return;
        }

        res.status(200).json(blogData);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while deleting the blog",
            error: error.message
        })
    }
})

module.exports = router;