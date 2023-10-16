const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name : String,
    email : String,
    password : String,
    age : Number,
    avatar: String,
    isAdmin: Boolean,
});

module.exports = model( 'user', mySchema );