const router = require ('express').Router();

const userRoute = require('./userRoute');
const blogRoute = require('./blogRoute');
const commentRoute = require('./commentRoute');

router.use('/user', userRoute);
router.use('/blog', blogRoute);
router.use('/comment', commentRoute)


module.exports = router;