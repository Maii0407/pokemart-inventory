const Category = require( '../models/category' );
const Item = require( '../models/item' );
const ItemCount = require( '../models/itemCount' );

const async = require( 'async' );
const { body, validationResult } = require( 'express-validator' );

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

//create new CATEGORY functionality
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

//delete CATEGORY functionality
exports.category_delete_get = ( req, res, next ) => {
  async.parallel({
    category: ( callback ) => {
      Category.findById( req.params.id ).exec( callback );
    },
    category_items: ( callback ) => {
      Item.find({ 'category': req.params.id }).exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.category == null ) {
      res.redirect( '/categories' );
    }

    res.render( 'category_delete', {
      title: 'DELETE CATEGORY:',
      category: results.category,
      category_items: results.category_items
    });
  });
};

exports.category_delete_post = ( req, res, next ) => {
  async.parallel({
    category: ( callback ) => {
      Category.findById( req.body.categoryid ).exec( callback );
    },
    categories_items: ( callback ) => {
      Item.find({ 'category': req.body.categoryid }).exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }

    if( results.categories_items.length > 0 ) {
      res.render( 'category_delete', {
        title: 'DELETE CATEGORY:',
        category: results.category,
        category_items: results.categories_items
      });
      return;
    }
    else {
      Category.findByIdAndRemove( req.body.categoryid, deleteCategory = ( err ) => {
        if( err ) { return next( err ); }

        res.redirect( '/categories' );
      })
    }
  });
};

//update CATEGORY functionality
exports.category_update_get = ( req, res, next ) => {
  Category.findById( req.params.id ).exec( ( err, category ) => {
    if( err ) { return next( err ); }
    if( category == null ) {
      const err = new Error( 'CATEGORY Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'category_form', {
      title: 'UPDATE CATEGORY',
      category: category
    });
  })
};

exports.category_update_post = [
  body( 'name', 'Category Name Required' ).trim().isLength({ min: 1 }).escape(),
  body( 'description', 'Category Description Required' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id
    });

    if( !errors.isEmpty() ) {
      res.render( 'category_form', {
        title: 'UPDATE CATEGORY',
        category: category,
        errors: errors.array()
      });
      return;
    }
    else {
      Category.findByIdAndUpdate( req.params.id, category, {}, ( err, thecategory ) => {
        if( err ) { return next( err ); }

        res.redirect( thecategory.url );
      });
    }
  }
];