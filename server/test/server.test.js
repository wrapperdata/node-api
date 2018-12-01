// const expect = require('expect');
// const request = require('supertest');

// const {app} = require('./../server');
// const {Todo} =require('./../models/todo');


// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

// describe('POST/ todo', () => {
//   it('should to return post data', (done) => {
//     let text = 'test todo text';

//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if(err) {
//           return done(err)
//         }
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch(e => done(e));
//       });
//   });
  // it('should not create todo with invalid body data', (done) => {
  //   request(app)
  //     .post('/todos')
  //     .send({})
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }

  //       Todo.find().then((todos) => {
  //         expect(todos.length).toBe(0);
  //         done();
  //       }).catch((e) => done(e));
  //     });
  // });

// });

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const anos = [
  {
    text: 'First text todo'
  },
  {
    text: 'Second text todo'
  }
];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    Todo.insertMany(anos)
  }).then(() => done());
  
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Text todo added';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(4);
      })
      .end(done);
  })
});
