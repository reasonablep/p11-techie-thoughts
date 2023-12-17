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
} catch(err) {
    res.status(500).json(err);
}
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne ({ where: { email: req.body.email }});
        if (!userData) {
            res.status(400).json(error);
            return;
        }
        const goodPassword = await userData.Data.checkPassword(req.body.password);

        if (!goodPassword) {
            res.status(400).json(error);
            return;
        }

        req.session.save(()=> {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json ({ user: userData, message: "Now logged in!" })
        });
    } catch (error) {
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