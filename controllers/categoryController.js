const Category = require( '../models/category' );
const Item = require( '../models/item' );

const async = require( 'async' );

exports.category_list = ( req, res, next ) => {
  Category.find( {}, 'name').sort({ name: 1}).exec( ( err, list_categories ) => {
    if( err ) { return next( err ); }

    res.render( 'category_list', {
      title: 'CATEGORY LIST',
      category_list: list_categories
    });
  });
};

exports.category_detail = ( req, res, next ) => {
  async.parallel({
    category: ( callback ) => {
      Category.findById( req.params.id ).exec( callback );
    },
    item_category: ( callback ) => {;
      Item.find({ 'category': req.params.id }).exec( callback )
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.category == null ) {
      const err = new Error( 'CATEGORY Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'category_detail', {
      title: 'CATEGORY DETAIL',
      category: results.category,
      item_category: results.item_category
    });
  });
};

exports.category_create_get = ( req, res, next ) => {};
exports.category_create_post = ( req, res, next ) => {};

exports.category_delete_get = ( req, res, next ) => {};
exports.category_delete_post = ( req, res, next ) => {};

exports.category_update_get = ( req, res, next ) => {};
exports.category_update_post = ( req, res, next ) => {};