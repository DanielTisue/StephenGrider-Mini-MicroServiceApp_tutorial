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

app.post('/posts', async (req, res) => {
  // This tells us the type of random 'id' we want to create. In this instance we are using 'hex'.
const id = randomBytes(4).toString('hex');
const { title } = req.body;

posts[id] = {
  id, title
}; // this is adding a new post to our post collection and storing it locally.

await axios.post('http://localhost:4005/events', {
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
  console.log('Listening on 4000');
});