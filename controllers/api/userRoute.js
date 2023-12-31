const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json({user: userData});
    });
} catch(error) {
    res.status(500).json({
        message: 'Error logging in',
        error: error.message
    })
}
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne ({ where: { email: req.body.email }});
        console.log(userData);
        if (!userData) {
            res.status(400).json("User not found");
            return;
        }
        const goodPassword =  userData.checkPassword(req.body.password);
        console.log(goodPassword);

        if (!goodPassword) {
            res.status(400).json("Password incorrect");
            return;
        }

        req.session.save(()=> {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json ({ user: userData, message: "Now logged in!" })
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        }
        );
    } else {
        res.status(404).end();
    }
});

module.exports = router;