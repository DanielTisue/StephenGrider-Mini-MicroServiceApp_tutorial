import React, { useState, useEffect } from 'react';
//useEffect hook can be used run some code at very specific points in time in the life cycle of a component. In our case we will want to run fetchPosts function only when it is first displayed on the screen. 
import axios from 'axios';
import CommentCreate from './CommentCreate';

export default ({ postId }) => {
const [comments, setComments] = useState([]);

const fetchData = async () => {
  const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

  setComments(res.data);
};

useEffect(() => {
  fetchData();
  }, []);

// console.log(comments);

const renderedComments = comments.map(comment => {
return <li key={comment.id}>{comment.content}</li>;

});

return <ul>{renderedComments}</ul>;
};
