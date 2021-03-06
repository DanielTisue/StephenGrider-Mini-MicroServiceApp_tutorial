import React from 'react';
//useEffect hook can be used run some code at very specific points in time in the life cycle of a component. In our case we will want to run fetchPosts function only when it is first displayed on the screen. 
import CommentCreate from './CommentCreate';

export default ({ comments }) => {
const renderedComments = comments.map(comment => {
return <li key={comment.id}>{comment.content}</li>;
});

return <ul>{renderedComments}</ul>;
};
