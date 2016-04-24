'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.status(201)
  res.json({
    'message': 'welcome to Warehouse API'
  })
});

router.use('/v1', require('./v1'))

module.exports = router;
