const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) =>{
    try {
        const newBlog = await Blog.create ({
            ...req.body,
            user_id: req.session.user_id,


        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req,res) => {
    try {
        const newComment = await Comment.create ({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
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
            res.status(404).json({ message: 'No blog posts found'});
            return;
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;