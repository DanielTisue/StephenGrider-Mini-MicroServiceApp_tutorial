const express = require('express');
//removed require body-parser due to notification to use the following below
// Below is a function from 'crypto' to generate random ids
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors()); //CORS is a function and therefore called as such.

// Using in-memory data structure.
const posts = {};

app.get('/posts', (req, res) => {
res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  // This tells us the type of random 'id' we want to create. In this instance we are using 'hex'.
const id = randomBytes(4).toString('hex');
const { title } = req.body;

// this is adding a new post to our post collection and storing it locally.
posts[id] = {
  id, title
}; 

// post req on local machine for dev http://localhost:4005/events but for kubernetes needs to be http://event-bus-srv:4005

await axios.post('http://event-bus-srv:4005/events', {
  type: 'PostCreated',
  data: {
    id, 
    title
  }
}).catch((err) =>
console.log(err.message)
);

res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('received event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v0.0.1')
  console.log('Listening on 4000');
});