'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Reviews Schema
 */
var CheckInSchema = new Schema({
  storeid: {
    type: String
  },
  userid:{
    type: String
  },
  checkintime:{
    type: Date
  },
  storestatus:{
    type: String
  }
});

mongoose.model('CheckIns', CheckInSchema);
