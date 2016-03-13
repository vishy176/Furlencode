'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  checkIns = mongoose.model('CheckIns'),
  Stores=mongoose.model('Stores'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {

  console.log(req.body)

  var checkIn = new checkIns(req.body);
  checkIn.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Stores.findById(req.body.storeid).exec(function (err, store) {
        if (err) {
          return next(err);
        } else if (!store) {
          return res.status(404).send({
            message: 'No article with that identifier has been found'
          });
        }
        store.checkins.push(checkIn);
        store.save(function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(store);
          }
        });
      });
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.checkIn);
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
 * List of CheckIns
 */
exports.list = function (req, res) {
  checkIns.find().exec(function (err, checkins) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(checkins);
    }
  });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
