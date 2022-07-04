const express = require('express');
//removed require body-parser due to notification to use the following below
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

//EX:
//posts === {
//   'j123j42' : {
//     id: 'j123j42',
//     title: 'post title',
//     comments: [
//       { id: 'klj3kl, content: 'comment' }
//     ]    
//   }
// }

//Helper function handling events
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
  const { id, title } = data;

  posts[id] = { id, title, comments: [] };
 }

 if (type === 'CommentCreated') {
  const { id, content, postId, status } = data;

  const post = posts[postId];
  post.comments.push ({ id, content, status });
 }

 if ( type === 'CommentUpdated') {
   const { id, content, postId, status } = data;

   const post = posts[postId];
   const comment = post.comments.find(comment => {
     return comment.id === id;
   });

   comment.status = status;
   comment.content = content;
 }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

 //------------------------------
 // Extracting the series of if statements into a separate helper function which can then be used through out the routes.
//  if (type === 'PostCreated') {
//   const { id, title } = data;

//   posts[id] = { id, title, comments: [] };
//  }

//  if (type === 'CommentCreated') {
//   const { id, content, postId, status } = data;

//   const post = posts[postId];
//   post.comments.push ({ id, content, status });
//  }

//  if ( type === 'CommentUpdated') {
//    const { id, content, postId, status } = data;

//    const post = posts[postId];
//    const comment = post.comments.find(comment => {
//      return comment.id === id;
//    });
// //-----------------------------------
//    comment.status = status;
//    comment.content = content;
//  }

  // console.log(posts);

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
 
    // could also use a forEach function
    for (let event of res.data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});