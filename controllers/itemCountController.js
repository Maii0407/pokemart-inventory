const ItemCount = require( '../models/itemCount' );
const Item = require( '../models/item' );

const async = require( 'async' );

exports.itemCount_list = ( req, res, next ) => {
  async.parallel({
    list_items: ( callback ) => {
      Item.find( {}, 'name' ).sort({ name: 1 }).exec( callback );
    },
    total_stock: ( callback ) => {
      ItemCount.countDocuments( {}, callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }

    res.render( 'itemCount_list', {
      title: 'STOCK LIST',
      para: 'Total Stock',
      itemcount_list: results.list_items,
      total: results.total_stock
    });
  });
};

exports.itemCount_detail = ( req, res, next ) => {};


exports.itemCount_create_get = ( req, res, next ) => {};
exports.itemCount_create_post = ( req, res, next ) => {};

exports.itemCount_delete_get = ( req, res, next ) => {};
exports.itemCount_delete_post = ( req, res, next ) => {};

exports.itemCount_update_get = ( req, res, next ) => {};
exports.itemCount_update_post = ( req, res, next ) => {};