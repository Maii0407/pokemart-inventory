const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ItemCountSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }
});

ItemCountSchema.virtual( 'url' ).get( function() {
  return `/catalog/itemcount/${ this._id }`;
});

module.exports = mongoose.model( 'ItemCount', ItemCountSchema );