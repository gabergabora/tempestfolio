const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/resume', (req, res) => {
  res.render('resfile');
});


module.exports = router;
