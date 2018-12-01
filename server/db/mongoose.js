const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todos';
mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {mongoose};