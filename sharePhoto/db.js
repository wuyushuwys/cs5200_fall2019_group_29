module.exports = function () {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/reactdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true})
        .then(() => console.log('Database Connected!'))
        .catch(err => {
            console.log(`Database Connection Error: ${err.message}`);
        });
}
