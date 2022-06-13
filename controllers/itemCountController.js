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

//add ITEM TO STOCK functionality
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

//delete ITEM IN STOCK functionality
exports.itemCount_delete_get = ( req, res, next ) => {
  ItemCount.findById( req.params.id ).populate( 'item' ).exec( ( err, item_count ) => {
    if( err ) { return next( err ); }
    if( item_count == null ) {
      res.redirect( '/items' );
    }

    res.render( 'itemCount_delete', {
      title: 'DELETE ITEM IN STOCK',
      item_count: item_count
    });
  })
};

exports.itemCount_delete_post = ( req, res, next ) => {
  ItemCount.findById( req.body.itemcountid ).populate( 'item' ).exec( ( err, item_count ) => {
    if( err ) { return next( err ); }

    ItemCount.findByIdAndRemove( req.body.itemcountid, deleteItemcount = ( err ) => {
      if( err ) { return next( err ); }

      res.redirect( item_count.item.url );
    })
  }) 
};

//update ITEM IN STOCK functionality
exports.itemCount_update_get = ( req, res, next ) => {
  async.parallel({
    itemcount: ( callback ) => {
      ItemCount.findById( req.params.id ).populate( 'item' ).exec( callback );
    },
    item: ( callback ) => {
      Item.find( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.itemcount == null ) {
      const err = new Error( 'ITEM IN STOCK Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'itemCount_form', {
      title: 'UPDATE ITEM IN STOCK',
      selected_item: results.itemcount.item._id,
      item_list: results.item
    });
  });
};

exports.itemCount_update_post = [
  body( 'item', 'An Item Must Be Specified' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let itemcount = new ItemCount({
      item: req.body.item,
      _id: req.params.id
    });

    if( !errors.isEmpty() ) {
      async.parallel({
        itemcount: ( callback ) => {
          ItemCount.findById( req.params.id ).populate( 'item' ).exec( callback );
        },
        item: ( callback ) => {
          Item.find( callback );
        }
      }, ( err, results ) => {
        if( err ) { return next( err ); }

        res.render( 'itemCount_form', {
          title: 'UPDATE ITEM IN STOCK',
          selected_item: results.itemcount.item._id,
          item_list: results.item
        });
      });
      return;
    }
    else {
      ItemCount.findByIdAndUpdate( req.params.id, itemcount, {}, ( err, theitemcount ) => {
        if( err ) { return next( err ); }

        res.redirect( theitemcount.url );
      });
    }
  }
];