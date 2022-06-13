const Item = require( '../models/item' );
const ItemCount = require( '../models/itemCount' );
const Category = require( '../models/category' );

const async = require( 'async' );
const { body, validationResult } = require( 'express-validator' );

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

//create new ITEM functionality
exports.item_create_get = ( req, res, next ) => {
  async.parallel({
    category: ( callback ) => {
      Category.find( callback )
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }

    res.render( 'item_form', {
      title: 'CREATE NEW ITEM',
      categories: results.category
    });
  });
};

exports.item_create_post = [
  body( 'name', 'Name Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'description', 'Description Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'price', 'Price Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'category.*' ).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });

    if( !errors.isEmpty() ) {
      async.parallel({
        category: ( callback ) => {
          Category.find( callback );
        }
      }, ( err, results ) => {
        if( err ) { return next( err ); }

        res.render( 'item_form', {
          title: 'CREATE NEW ITEM:',
          categories: results.category,
          item: item,
          errors: errors.array()
        });
      });
      return;
    }
    else {
      item.save( (err) => {
        if( err ) { return next( err ); }

        res.redirect( item.url );
      });
    }
  }
];

//delete ITEM functionality
exports.item_delete_get = ( req, res, next ) => {
  async.parallel({
    item: ( callback ) => {
      Item.findById( req.params.id ).exec( callback );
    },
    item_instock: ( callback ) => {
      ItemCount.find({ 'item': req.params.id }).exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.item == null ) {
      res.redirect( '/items' );
    }

    res.render( 'item_delete', {
      title: 'DELETE ITEM:',
      item: results.item,
      item_instock: results.item_instock
    })
  });
};

exports.item_delete_post = ( req, res, next ) => {
  async.parallel({
    item: ( callback ) => {
      Item.findById( req.body.itemid ).exec( callback );
    },
    item_instock: ( callback ) => {
      ItemCount.find({ 'item': req.body.itemid }).exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }

    if( results.item_instock.length > 0 ) {
      res.render( 'item_delete', {
        title: 'DELETE ITEM:',
        item: results.item,
        item_instock: results.item_instock
      });
      return;
    }
    else {
      Item.findByIdAndRemove( req.body.itemid, deleteItem = ( err ) => {
        if( err ) { return next( err ); }

        res.redirect(  '/items')
      })
    }
  });
};

//update ITEM functionality
exports.item_update_get = ( req, res, next ) => {
  async.parallel({
    item: ( callback ) => {
      Item.findById( req.params.id ).populate( 'category' ).exec( callback );
    },
    category: ( callback ) => {
      Category.find( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.item == null ) {
      const err = new Error( 'ITEM Not Found' );
      err.status = 404;
      return next( err );
    }

    res.render( 'item_form', {
      title: 'UPDATE ITEM',
      item: results.item,
      categories: results.category,
      selected_category: results.item.category
    });
  });
};

exports.item_update_post = [
  body( 'name', 'Name Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'description', 'Description Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'price', 'Price Must Not Be Empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'category.*' ).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    let item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      _id: req.params.id
    });

    if( !errors.isEmpty() ) {
      async.parallel({
        category: ( callback ) => {
          Category.find( callback );
        }
      }, ( err, results ) => {
        if( err ) { return next( err ); }

        res.render( 'item_form', {
          title: 'CREATE NEW ITEM:',
          categories: results.category,
          item: item,
          selected_category: results.category._id,
          errors: errors.array()
        });
      });
      return;
    }
    else {
      Item.findByIdAndUpdate( req.params.id, item, {}, ( err, theitem ) => {
        if( err ) { return next( err ); }

        res.redirect( theitem.url );
      });
    }
  }
];