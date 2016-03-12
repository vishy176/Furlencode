'use strict';

/**
 * Module dependencies.
 */
var persons = require('../controllers/persons.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/persons')
    .get(persons.list)
    .post(persons.create);

  // // Single article routes
  // app.route('/api/articles/:articleId')
  //   .get(persons.read)
  //   .put(persons.update)
  //   .delete(persons.delete);
  //
  // // Finish by binding the article middleware
  // app.param('articleId', persons.articleByID);
};
