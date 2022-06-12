const Item = require( '../models/item' );
const ItemCount = require( '../models/itemCount' );

const async = require( 'async' );

exports.item_list = ( req, res, next ) => {
  Item.find( {}, 'name price').sort({ name: 1 }).exec( ( err, list_items ) => {
    if( err ) { return next( err ); }

    res.render( 'item_list', {
      title: 'ITEM LIST',
      item_list: list_items
    });
  });
};

exports.item_detail = ( req, res, next ) => {
  async.parallel({
    item: ( callback ) => {
      Item.findById( req.params.id ).populate( 'category' ).exec( callback );
    },
    item_count: ( callback ) => {
      ItemCount.find({ 'item': req.params.id }).exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.item == null ) {
      const err = new Error( 'ITEM Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'item_detail', {
      title: 'ITEM DETAIL',
      item: results.item,
      item_stock: results.item_count
    });
  });
};


exports.item_create_get = ( req, res, next ) => {};
exports.item_create_post = ( req, res, next ) => {};

exports.item_delete_get = ( req, res, next ) => {};
exports.item_delete_post = ( req, res, next ) => {};

exports.item_update_get = ( req, res, next ) => {};
exports.item_update_post = ( req, res, next ) => {};