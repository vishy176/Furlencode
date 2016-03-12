'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 *  PersonSchema
 */
var PersonSchema = new Schema({
  birthday: {
    type: Date
  },
  name: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  role:{
    type: String
  },
  phone:{
    type:Number
  },
  emailid:{
    type: String
  },
  gender:{
    type: String
  }
});

mongoose.model('Persons', PersonSchema);
