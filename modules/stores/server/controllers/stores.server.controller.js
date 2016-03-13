'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Stores = mongoose.model('Stores'),
  Reviews = mongoose.model('Reviews'),
  CheckIns = mongoose.model('CheckIns'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {

  console.log(req.body);
  var store = new Stores(req.body);

  store.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(store);
    }
  });
};


/**
 * Search by Location
 */
exports.storeByLocation = function (req, res) {
  console.log("it is by location");
  console.log(req.body);
  var findlocationjson = '{ "loc" :{ $near :' + req.body +'}}';
  console.log(findlocationjson)
  Stores.find(findlocationjson).populate('checkins','_id storestatus checkintime', null, { sort: { 'checkintime': -1 } }).populate("reviews").exec(function (err, stores) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stores);
    }
  });
};


/**
 * Show the current article
 */
exports.read = function (req, res) {
  //console.log(req.store.id)
  var storereviews;
  var checkins;
  var x={};
  x["storedata"] = req.store
  //getReviewsOfStore(req.store.id,function(storereviews){
    //console.log("appending here")
    //console.log(req.store);
    //console.log(storereviews);
    //x["reviews"] = storereviews;
    //getCheckinsOfStore(req.store.id,function(checkins){
      //console.log(checkins);
      //x["checkins"] = checkins;
      res.json(x);
    //})
  //});
};

/**
 * Update a article

exports.update = function (req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
*/

/**
 * Delete an article

exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
*/

/**
 * List of Stores
 */
exports.list = function (req, res) {
  Stores.find().populate('checkins','_id storestatus checkintime', null, { sort: { 'checkintime': -1 } }).populate("reviews").exec(function (err, stores) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stores);
    }
  });
};

/**
 * Store middleware
 */
exports.storeByID = function (req, res, next, id) {
  //console.log("it is here")
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Store Id is invalid'
    });
  }

  Stores.findById(id).populate('checkins','_id storestatus checkintime', null, { sort: { 'checkintime': -1 } }).populate("reviews").exec(function (err, store) {
    if (err) {
      return next(err);
    } else if (!store) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.store = store;
    next();
  });
};

function getReviewsOfStore (id,callback){
  var storeReviews={}
  var storejson = {}
  storejson["storeid"] = id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //console.log("sending back null")
    callback(storeReviews)
  }
  Reviews.find(storejson).exec(function (err, reviews) {
    if (err) {
      return storeReviews
    } else {
      //console.log("got the funcking response")
      storeReviews = reviews
      //console.log(storeReviews)
      callback(storeReviews)
    }
  });
}


function getCheckinsOfStore (id,callback){
  var checkins={}
  var storejson = {}
  storejson["storeid"] = id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //console.log("sending back null")
    callback(checkins)
  }
  CheckIns.find(storejson).exec(function (err, checkIns) {
    if (err) {
      return checkins
    } else {
      //console.log("got the funcking response")
      checkins = checkIns
      //console.log(checkins)
      callback(checkins)
    }
  });
}
