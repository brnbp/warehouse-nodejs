'use strict'

const collection = 'log'

function WarehouseDAO(model){
  this.model = model
}

WarehouseDAO.prototype.create = function(data, callback) {
  let model = new this.model(data)
  model.save( (err, result) => callback(err, result) )
};

WarehouseDAO.prototype.find = function(query, callback) {
  this.model.find(query).exec(callback)
};


module.exports = function(mongoose) {
  let Log = mongoose.model(collection, {
    incidents:  Number,
    level:      String,
    log_name:   String,
    identifier: String,
    content:    Object,
    store:      String
  })

  return new WarehouseDAO(Log)
}