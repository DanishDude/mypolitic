const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'My Politic'
  });
});

router.get('/toto', (req, res) => {
  res.json({
    toto: process.env.TOTO.toString()
  });
});

module.exports = router;
