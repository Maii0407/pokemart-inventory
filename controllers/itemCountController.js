const ItemCount = require( '../models/itemCount' );

const async = require( 'async' );

exports.itemCount_detail = ( req, res, next ) => {
  ItemCount.findById( req.params.id ).populate( 'item' ).exec( ( err, item_count ) => {
    if( err ) { return next( err ); }
    if( item_count == null ) {
      const err = new Error( 'ITEMCOUNT Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'itemCount_detail', {
      title: 'ITEM IN STOCK DETAIL',
      item_count: item_count
    });
  });
};

exports.itemCount_create_get = ( req, res, next ) => {};
exports.itemCount_create_post = ( req, res, next ) => {};

exports.itemCount_delete_get = ( req, res, next ) => {};
exports.itemCount_delete_post = ( req, res, next ) => {};

exports.itemCount_update_get = ( req, res, next ) => {};
exports.itemCount_update_post = ( req, res, next ) => {};