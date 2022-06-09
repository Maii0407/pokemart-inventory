const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    maxLength: 100
  },
  price: {
    type: Number,
    required: true,
    maxLength: 20
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'ItemCount',
    required: true
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'ItemCount',
    required: true 
  }
});

ItemSchema.virtual( 'url' ).get( function() {
  return `/catalog/item/${ this._id }`;
});

module.exports = mongoose.model( 'Item', ItemSchema );