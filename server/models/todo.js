const mongoose = require('mongoose'); 

let Todo = mongoose.model('Todos', {
  text: {
    type: String,
    require: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  }, 
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};