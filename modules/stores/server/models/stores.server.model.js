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
  },
  opentime:{
    type: String
  },
  storeLocation:{
    type: String
  },
  closetime:{
    type: String
  },
  checkins: [{ type: Schema.Types.ObjectId, ref: 'CheckIns'}],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews'}]
});

mongoose.model('Stores', StoresSchema);
