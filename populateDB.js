#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Item = require('./models/item');
const Category = require('./models/category');
const ItemCount = require('./models/itemCount');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];
var itemcounts = [];

const itemCreate = ( name, description, price, category, cb ) => {
  itemDetail = {
    name: name,
    description: description,
    price: price,
    category: category
  };

  const item = new Item( itemDetail );

  item.save( ( err ) => {
    if( err ) {
      console.log( `ERROR CREATING item ${ item }` );
      cb( err, null );
      return;
    }
    console.log( `New Item ${ item }` );
    items.push( item );
    cb( null, item );
  });
};

const categoryCreate = ( name, description, cb ) => {
  categoryDetail = {
    name: name,
    description: description
  };

  const category = new Category( categoryDetail );

  category.save( ( err ) => {
    if( err ) {
      console.log( `ERROR CREATING category ${ category }` );
      cb( err, null );
      return;
    }
    console.log( `New Category ${ category }` );
    categories.push( category );
    cb( null, category );
  })
};

const itemCountCreate = ( item, cb ) => {
  itemCountDetail = { item: item };

  const itemCount = new ItemCount( itemCountDetail );

  itemCount.save( ( err ) => {
    if( err ) {
      console.log( `ERROR CREATING itemcount ${ itemCount }` );
      cb( err, null );
      return;
    }
    console.log( `New ItemCount ${ itemCount }` );
    itemcounts.push( itemCount );
    cb( null, itemCount );
  });
};

const generateCategory = ( cb ) => {
  async.series([
    ( callback ) => {
      categoryCreate( 'Medicine', 'Healing and permanent stat-enhancing medicines', callback );
    },
    ( callback ) => {
      categoryCreate( 'TMs', 'Technical Machine to teach Pokemon new moves', callback );
    },
    ( callback ) => {
      categoryCreate( 'Berries', 'Fruits with large range of flavors and effects on Pokemon', callback );
    },
    ( callback ) => {
      categoryCreate( 'Item', 'Other items such as battle item, escape ropes, repels, etc...', callback );
    }
  ], cb);
};

const generateItem = ( cb ) => {
  async.series([
    ( callback ) => {
      itemCreate( 'TM17 (Protect)', 'Enables user to evade all attacks. Chances of failing rises if used in succesion', '10000', categories[1], callback );
    },
    ( callback ) => {
      itemCreate( 'Poke Ball', 'Device for catching wild Pokemon', '200', categories[3], callback );
    },
    ( callback ) => {
      itemCreate( 'Great Ball', 'High-performance Ball that offers higher catch rate than a standard Poke Ball', '600', categories[3], callback );
    },
    ( callback ) => {
      itemCreate( 'Potion', 'Restores Pokemon HP by 20', '200', categories[0], callback );
    },
    ( callback ) => {
      itemCreate( 'Repel', 'Repels weaker wild Pokemon for 100 steps', '400', categories[3], callback );
    },
    ( callback ) => {
      itemCreate( 'Oran Berry', 'Heals holder by 10 HP if under 50% HP in battle', '100', categories[2], callback );
    }
  ], cb);
};

const generateItemCount = ( cb ) => {
  async.series([
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[0], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[1], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[2], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[3], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[4], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
    ( callback ) => {
      itemCountCreate( items[5], callback );
    },
  ], cb);
};

async.series([
  generateCategory,
  generateItem,
  generateItemCount
],
( err, results ) => {
  if(  err ) {
    console.log( `FINAL ERROR: ${ err }` );
  }
  else {
    console.log( 'Success' );
  }

  mongoose.connection.close();
});