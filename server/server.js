const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

const port = process.env.PORT || 3000;

//importing models
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get('/todos',(req, res) => {
  User.find().then((users) => {
    res.status(200).send({users})
  }, (err) => {
    res.status(400).send(err);
  });
});


app.get('/todos/:id', (req, res) => {
  let id = req.params.id,
      objId = mongoose.Types.ObjectId;
 
  if(!objId.isValid(id)) {
    return res.status(404).send();
  }

  // Todo.find({
  //   _id: id
  // }).then((todo) => {
  //   res.send(todo);
  // }).catch((err) => {
  //   res.status(400).send();
  // });

  Todo.findById(id).then((todos) => {
    if(!todos) {
      res.status(404).send();
    }
    res.status(200).send(todos);
  }).catch((err) => {
    res.status(400).send();
  });
  
});

 


app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  

  todo.save().then((result) => {
    if(todo === '') {
      return res.status(400).res.send();
    }
    res.status(200).send(result);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => console.log(`Started on port ${port}`));


module.exports = {app};