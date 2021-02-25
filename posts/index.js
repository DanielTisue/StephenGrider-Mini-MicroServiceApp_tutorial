const express = require('express');
const bodyParser = require('body-parser');
// Below is a function from 'crypto' to generate random ids
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); //CORS is a function and therefore called as such.

// Using in-memory data structure.
const posts = {};

app.get('/posts', (req, res) => {
res.send(posts);
});

app.post('/posts', (req, res) => {
  // This tells us the type of random 'id' we want to create. In this instance we are using 'hex'.
const id = randomBytes(4).toString('hex');
const { title } = req.body;

posts[id] = {
  id, title
};

res.status(201).send(posts[id]);
});


app.listen(4000, () => {
  console.log('Listening on 4000');
});