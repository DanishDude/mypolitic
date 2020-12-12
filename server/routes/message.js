const { Router } = require('express');
const router = Router();
const email = require('../services/email');
const userService = require('../services/user');

router.route('/info').post(async (req, res, next) => {
    try {
        const user = await userService.getOneByEmail(req.body.senderEmail);
        const userInfo = typeof user !== 'string' ? user : {};
        const result = await email.clientContact({ ...req.body, ...userInfo['_doc'] });
        if (result) {
            res.status(200).send({ success: true, msg: 'Email sent' });
        } else {
            res.status(500).send({ success: false, msg: 'Error sending email' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
