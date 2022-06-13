const ItemCount = require( '../models/itemCount' );
const Item = require( '../models/item' );

const async = require( 'async' );
const { body, validationResult } = require( 'express-validator' );

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

//ADD ITEM TO STOCK FUNCTIONALITY
exports.itemCount_create_get = ( req, res, next ) => {
  Item.find( {}, 'name' ).exec( ( err, items ) => {
    if( err ) { return next( err ); }

    res.render( 'itemCount_form', {
      title: 'ADD AN ITEM TO STOCK:',
      item_list: items
    });
  });
};

exports.itemCount_create_post = [
  body( 'item', 'An Item Must Be Specified' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let itemcount = new ItemCount({
      item: req.body.item
    });

    if( !errors.isEmpty() ) {
      Item.find( {}, 'name' ).exec( ( err, items ) => {
        if( err ) { return next( err ); }

        res.render( 'itemCount_form', {
          title: 'ADD AN ITEM TO STOCK',
          item_list: items,
          selected_item: itemcount.item._id,
          errors: errors.array(),
          itemcount: itemcount
        });
      });
      return;
    }
    else {
      itemcount.save( ( err ) => {
        if( err ) { return next( err ); }

        res.redirect( itemcount.url );
      });
    }
  }
];

exports.itemCount_delete_get = ( req, res, next ) => {};
exports.itemCount_delete_post = ( req, res, next ) => {};

exports.itemCount_update_get = ( req, res, next ) => {};
exports.itemCount_update_post = ( req, res, next ) => {};