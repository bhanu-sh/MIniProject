const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name : String,
    email : String,
    message : String,
    date : { type : Date, default : Date.now }
});

module.exports = model( 'messages', mySchema );
