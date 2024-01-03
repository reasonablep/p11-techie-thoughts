const router = require ('express').Router();

const userRoute = require('./userRoute');
const blogRoute = require('./blogRoute');
const commentRoute = require('./commentRoute');

router.use('/user', userRoute);
router.use('/blog', blogRoute);
router.use('/blog/:blogId/comment', commentRoute)


module.exports = router;