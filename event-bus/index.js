const express = require('express');
//removed require body-parser due to notification to use the following below
const axios = require('axios');


const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

// post reqs on local machine for dev http://localhost:4000(...1,2,3)/events but for kubernetes needs to be http://posts-clusterip-srv:4005 ... will change deoending on post req port
  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    console.log(err.message);
  });
//have to add error handling if the request fails.
  
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
})