const { model, Schema } = require('../connection');

const mySchema = new Schema({
    title : String,
    user_id : String,
    user_name : String,
    type : String,
    description : String,
    year : Number,
    image : String,
    price : Number,
    rating : Number,
    reviews: String
});

module.exports = model( 'products', mySchema );
