const auth = require('../services/auth');
const { Router } = require('express');

const router = Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);

module.exports = router;
