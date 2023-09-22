const mongoose = require('mongoose');

const url = 'mongodb+srv://bhanu:1234@cluster0.qzxivp1.mongodb.net/mernaug630?retryWrites=true&w=majority';

//asynchronous - return Promise
mongoose.connect(url)
.then((result) => {
    console.log('Database Connected Successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;