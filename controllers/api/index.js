const router = require ('express').Router();

const userRoute = require('./userRoute');
const blogRoute = require('./blogRoute');

router.use('/users', userRoute);
router.use('/blog', blogRoute);

module.exports = router;