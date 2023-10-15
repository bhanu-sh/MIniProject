const { model, Schema } = require('../connection');

const mySchema = new Schema({
    user_id : String,
    product_id : String,
    product_name : String,
    seller_id : String,
    seller_name : String,
    status : String,
    image : String,
    price : Number,
    name : String,
    date : String,
    email : String,
    address : {
        line1 : String,
        city : String,
        state : String,
        pincode : Number,
        phone : Number,
    },
    status: String,
    paymentMethod: String,
});

module.exports = model( 'orders', mySchema );
