'use strict'

const debug = require('debug')('warehouse:controller')

const Promise = require('bluebird')

function WarehouseController(WarehouseModel){
  this.model = Promise.promisifyAll(WarehouseModel)
}

WarehouseController.prototype.store = function(request, response, next){
  let query = request.query
  query.store = request.params.store
  this.model.findAsync({query})
      .then(data => response.json(data))
      .catch(next)
}

WarehouseController.prototype.log = function(request, response, next){
  var body = request.body
  this.model.createAsync(body)
      .then(function(err, data){
        response.json(data)
      })
      .catch(next)
}

module.exports = WarehouseModel => new WarehouseController(WarehouseModel)
