const express = require('express');
//removed require body-parser due to notification to use the following below
// Below is a function from 'crypto' to generate random ids
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors()); //CORS is a function and therefore called as such.

// Using in-memory data structure. This will be more complicated than our posts data structure because we need the comment to be associated with the post id. See routes below for example.
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
// This tells us the type of random 'id' we want to create. In this instance we are using 'hex'.
const commentId = randomBytes(4).toString('hex'); //generate random id
const { content } = req.body; //get the content of the comment

const comments= commentsByPostId[req.params.id] || []; //get the list of comments associated with the given post that already exists.

comments.push({ id: commentId, content, status: 'pending' }); //where the comment is created.

commentsByPostId[req.params.id] = comments;

await axios.post('http://localhost:4005/events', {
  type: 'CommentCreated',
  data: {
    id: commentId, // taken from line 21 & 26 where commentId is established
    content, // taken from line 22 & 26 where comment is outlined 
    postId: req.params.id, //taken from line 16 & 24 where postId is established.
    status: 'pending'
  }

})



res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('received event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find( comment => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://loca;host:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
      }
    })
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});