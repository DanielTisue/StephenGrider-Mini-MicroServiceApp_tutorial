import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');
  
  const onSubmit = async (event) => {
    event.preventDefault();

    // when deploying via docker / kubernetes ingress-nginx [localhost:4001] gets changed to url used in host file [posts.com]
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content
    });

    setContent('');
  };

  return (
  <div>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>New Comment</label>
        <input value={content} onChange={e => setContent(e.target.value)} className="form-control" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>

  ); 
}         