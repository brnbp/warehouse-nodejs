'use strict'

const express = require('express');
const router = express.Router();

const mongoose = require('../dbs/mongoose')
const WarehouseModel = require('../models/WarehouseModel')(mongoose)

const WarehouseController = require('../controllers/WarehouseController')(WarehouseModel)

const passport = require('passport');

let authentication = passport.authenticate('basic', {session: false})

router.get(
  '/store/:store',
  authentication,
  WarehouseController.store.bind(WarehouseController)
);

router.post(
  '/log',
  authentication,
  WarehouseController.log.bind(WarehouseController)
)


module.exports = router;