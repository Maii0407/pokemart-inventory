const Item = require( '../models/item' );

exports.item_list = ( req, res, next ) => {
  res.send('Hello');
};

exports.item_detail = ( req, res, next ) => {};


exports.item_create_get = ( req, res, next ) => {};
exports.item_create_post = ( req, res, next ) => {};

exports.item_delete_get = ( req, res, next ) => {};
exports.item_delete_post = ( req, res, next ) => {};

exports.item_update_get = ( req, res, next ) => {};
exports.item_update_post = ( req, res, next ) => {};