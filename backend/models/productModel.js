const { model, Schema } = require('../connection');

const mySchema = new Schema({
    title : String,
    type : String,
    description : String,
    image : String,
    price : Number,
    rating : Number,
    reviews: String
});

module.exports = model( 'products', mySchema );
