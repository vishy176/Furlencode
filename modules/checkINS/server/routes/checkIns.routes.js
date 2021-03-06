'use strict';

/**
 * Module dependencies.
 */
var reviews = require('../controllers/checkIns.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/checkIns')
    .get(reviews.list)
    .post(reviews.create);

  // // Single article routes
  // app.route('/api/articles/:articleId')
  //   .get(articles.read)
  //   .put(articles.update)
  //   .delete(articles.delete);
  //
  // // Finish by binding the article middleware
  // app.param('articleId', articles.articleByID);
};
