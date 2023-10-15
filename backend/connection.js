const mongoose = require('mongoose');

const url = 'mongodb+srv://'+ process.env.MONGOOSE_API +'?retryWrites=true&w=majority';

//asynchronous - return Promise
mongoose.connect(url)
.then((result) => {
    console.log('Database Connected Successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;