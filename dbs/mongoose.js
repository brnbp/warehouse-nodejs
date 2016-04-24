'use strict'

const mongoose = require('mongoose'),
      debug = require('debug')('warehouse:db'),
      config = require('config')

function authentications(){
  let username = config.get('mongo.dev.username'),
      password = config.get('mongo.dev.password'),
      server   = config.get('mongo.dev.server'),
      port     = config.get('mongo.dev.port'),
      database = config.get('mongo.dev.database'),
      auth = username ? username  + ':' + password + '@' : ''

  return 'mongodb://' + auth + server + ':' + port + '/' + database
}

mongoose.connect(authentications())

let db = mongoose.connection

db.on('error', err => debug(err))

db.once('open', callback => debug('connected to mongodb'))

module.exports = mongoose