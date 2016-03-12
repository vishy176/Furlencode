'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stores Schema
 */
var StoresSchema = new Schema({
  storeName: {
    type: String
  },
  loc: {type: [Number], index: '2d'},
  desc:{
    type: String
  },
  category:{
    type: String
  }
});

mongoose.model('Stores', StoresSchema);
