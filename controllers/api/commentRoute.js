const router = require('express').Router();
const withAuth = require('../../utils/auth')
const { Comment, User } = require('../../models');

router.get('/:blogId/comment', withAuth, async (req, res) => {
    try {
        const { blogId } = req.params.id;
        const comments = await Comment.findAll ({
            where: {blog_id: blogId},
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            order: [
                ['stamp', 'DESC']
            ]
        });
        if (!comments) {
            console.log('No comments found')
            res.status(404).json ({ message: 'No comments found for this blog entry '});
            return;
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error', error)
        res.status(500).json(error);
    }
});

router.post('/:blogId/comment', withAuth, async (req,res) => {
    try {
        const { blogId } = req.params;
        const newComment = await Comment.create ({
            ...req.body,
            blog_id: blogId,
            user_id: req.session.user_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;