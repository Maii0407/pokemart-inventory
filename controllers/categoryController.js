const async = require( 'async' );
const { body, validationResult } = require( 'express-validator' );

const Category = require( '../models/category' );
const Item = require( '../models/item' );

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

//CREATE NEW CATEGORY FUNCTIONALITY
exports.category_create_get = ( req, res, next ) => {
  res.render( 'category_form', {
    title: 'CREATE NEW CATEGORY'
  });
};

exports.category_create_post = [
  body( 'name', 'Category Name Required' ).trim().isLength({ min: 1 }).escape(),
  body( 'description', 'Category Description Required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let category = new Category({
      name: req.body.name,
      description: req.body.description
    });

    if( !errors.isEmpty() ) {
      res.render( 'category_form', {
        title: 'CREATE NEW CATEGORY',
        category: category,
        errors: errors.array()
      });
      return;
    }
    else {
      Category.findOne({ 'name': req.body.name }).exec( ( err, category_found ) => {
        if( err ) { return next( err ); }
        if( category_found ) {
          res.redirect( category_found.url );
        }
        else {
          category.save( ( err ) => {
            if( err ) { return next( err ); }

            res.redirect( category.url );
          });
        }
      });
    }
  }
];

exports.category_delete_get = ( req, res, next ) => {};
exports.category_delete_post = ( req, res, next ) => {};

exports.category_update_get = ( req, res, next ) => {};
exports.category_update_post = ( req, res, next ) => {};