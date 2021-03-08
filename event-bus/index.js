const express = require('express');
// const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);
//have to add error handling if the request fails.
  
  res.send({ staus: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
})