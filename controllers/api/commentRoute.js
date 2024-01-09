const router = require('express').Router();
// const withAuth = require('../../utils/auth')
const { Comment, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findByPk (req.params.blog_id,{
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
        console.log(comments);
    } catch (error) {
        console.error('Error', error)
        res.status(500).json(error);
    }
});

router.post('/:blog_id', async (req,res) => {
    try {
        const { blog_id, comment } = req.body;

        if (!comment) {
            res.status(404).json({
                message: 'No comment entered'
            });
            return;
        };
        console.log('THIS IS A USER SESSION');
        console.log(req.session.user_id);

        const newComment = await Comment.create ({
            comment: comment,
            blog_id: blog_id,
            user_id: req.session.user_id
        });


        res.status(200).json(newComment);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to post comment',
            error: error.message
        })
    }
});

module.exports = router;