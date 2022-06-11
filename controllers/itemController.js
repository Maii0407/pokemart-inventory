const Item = require( '../models/item' );

exports.item_list = ( req, res, next ) => {
  Item.find( {}, 'name price').sort({ name: 1 }).exec( ( err, list_items ) => {
    if( err ) { return next( err ); }

    res.render( 'item_list', {
      title: 'ITEM LIST',
      item_list: list_items
    });
  });
};

exports.item_detail = ( req, res, next ) => {};


exports.item_create_get = ( req, res, next ) => {};
exports.item_create_post = ( req, res, next ) => {};

exports.item_delete_get = ( req, res, next ) => {};
exports.item_delete_post = ( req, res, next ) => {};

exports.item_update_get = ( req, res, next ) => {};
exports.item_update_post = ( req, res, next ) => {};