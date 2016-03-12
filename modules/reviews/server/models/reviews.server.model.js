'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Reviews Schema
 */
var ReviewSchema = new Schema({
  storeid: {
    type: String
  },
  userid:{
    type: String
  },
  rating:{
    type: Number
  },
  review:{
    type: String
  }
});

mongoose.model('Reviews', ReviewSchema);
