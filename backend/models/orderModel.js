const { model, Schema } = require('../connection');

const mySchema = new Schema({
    user_id : String,
    product_id : String,
    product_name : String,
    image : String,
    price : Number,
    name : String,
    address : {
        line1 : String,
        city : String,
        state : String,
        pincode : Number
    },
});

module.exports = model( 'orders', mySchema );
