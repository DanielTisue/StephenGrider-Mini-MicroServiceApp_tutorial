import React, { useState, useEffect } from 'react';
//useEffect hook can be used run some code at very specific points in time in the life cycle of a component. In our case we will want to run fetchPosts function only when it is first displayed on the screen. 
import axios from 'axios';

export default () => {
const [posts, setPosts] = useState({});

const fetchPosts = async () => {
  const res = await axios.get('http://localhost:4000/posts');

  setPosts(res.data);
};

useEffect(() => {
  fetchPosts();
  }, []);

// console.log(posts);

const renderedPosts = Object.values(posts).map(post => {
return (
  <div className="card" style={{ width: '30%', marginBottom: '20px'}} key={post.id}>
    <div className='card-body'>
      <h3>{post.title}</h3>
      </div>
  </div>
);
});
//Object.value: this is a built in JS function that is going to give us an array of all the values inside of (posts). Essentially, this should be an array of actual post objects. 
//We then map over that array, and for every post inside there, we are going to generate some JSX and return it from this mapping function.
  return <div className="d-flex flex-row flex-wrap justify-content-around">
    {renderedPosts}
  </div>;
};