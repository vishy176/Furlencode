'use strict';

/**
 * Module dependencies.
 */
var stores = require('../controllers/stores.server.controller');

module.exports = function (app) {
  // Stores collection routes
  app.route('/api/stores')
    .get(stores.list)
    .post(stores.create);

  app.route('/api/stores/location')
    .post(stores.storeByLocation);

  // Single store routes
  app.route('/api/stores/:storeid')
    .get(stores.read)

  // Finish by binding the Stores middleware
  app.param('storeid', stores.storeByID);

  app.route('/api/stores/location')
    .post(stores.storeByLocation);
};
