const express = require('express');
const router = express.Router();

const async = require( 'async' );

const Item = require( '../models/item' );
const Category = require( '../models/category' );
const ItemCount = require( '../models/itemCount' );

//CONTROLLERS
const item_controller = require( '../controllers/itemController' );
const category_controller = require( '../controllers/categoryController' );
const item_count_controller = require( '../controllers/itemCountController' );

/* GET home page. */
router.get('/', (req, res, next) => {
  async.parallel({
    item_quantity: ( callback ) => {
      Item.countDocuments( {}, callback );
    },
    category_quantity: ( callback ) => {
      Category.countDocuments( {}, callback );
    },
    itemCount_quantity: ( callback ) => {
      ItemCount.countDocuments( {}, callback );
    }
  }, ( err, results ) => {
    res.render( 'index', {
      title: 'Pokemart Inventory',
      error: err,
      data: results
    });
  });
});

//ITEM ROUTES
router.get( '/items', item_controller.item_list );
router.get( '/item/:id', item_controller.item_detail );

router.get( '/item/create', item_controller.item_create_get );
router.get( '/item/create', item_controller.item_create_get );

router.get( '/item/:id/delete', item_controller.item_delete_get );
router.get( '/item/:id/delete', item_controller.item_delete_post );

router.get( '/item/:id/update', item_controller.item_update_get );
router.get( '/item/:id/update', item_controller.item_update_post );

//CATEGORY ROUTES
router.get( '/categories', category_controller.category_list );
router.get( '/category/:id', category_controller.category_detail );

router.get( '/category/create', category_controller.category_create_get );
router.get( '/category/create', category_controller.category_create_post );

router.get( '/category/:id/delete', category_controller.category_delete_get );
router.get( '/category/:id/delete', category_controller.category_delete_post );

router.get( '/category/:id/update', category_controller.category_update_get );
router.get( '/category/:id/update', category_controller.category_update_post );

//ITEM COUNT ROUTES
router.get( '/itemcounts', item_count_controller.itemCount_list );
router.get( '/itemcount/:id', item_count_controller.itemCount_detail );

router.get( '/itemcount/create', item_count_controller.itemCount_create_get );
router.get( '/itemcount/create', item_count_controller.itemCount_create_post );

router.get( '/itemcount/:id/delete', item_count_controller.itemCount_delete_get );
router.get( '/itemcount/:id/delete', item_count_controller.itemCount_delete_post );

router.get( '/itemcount/:id/update', item_count_controller.itemCount_update_get );
router.get( '/itemcount/:id/update', item_count_controller.itemCount_update_post );

module.exports = router;
