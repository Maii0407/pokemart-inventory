const Category = require( '../models/category' );

exports.category_list = ( req, res, next ) => {
  Category.find( {}, 'name').sort({ name: 1}).exec( ( err, list_categories ) => {
    if( err ) { return next( err ); }

    res.render( 'category_list', {
      title: 'CATEGORY LIST',
      category_list: list_categories
    });
  });
};

exports.category_detail = ( req, res, next ) => {};


exports.category_create_get = ( req, res, next ) => {};
exports.category_create_post = ( req, res, next ) => {};

exports.category_delete_get = ( req, res, next ) => {};
exports.category_delete_post = ( req, res, next ) => {};

exports.category_update_get = ( req, res, next ) => {};
exports.category_update_post = ( req, res, next ) => {};