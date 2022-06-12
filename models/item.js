const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ItemCount = require( './itemCount' );

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
    ref: 'Category',
    required: true
  }
});

ItemSchema.virtual( 'url' ).get( function() {
  return `/item/${ this._id }`;
});

ItemSchema.virtual( 'total' ).get( function() {
  
});

module.exports = mongoose.model( 'Item', ItemSchema );