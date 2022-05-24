import React from 'react';
//useEffect hook can be used run some code at very specific points in time in the life cycle of a component. In our case we will want to run fetchPosts function only when it is first displayed on the screen. 
import CommentCreate from './CommentCreate';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
      let content;

      //could also use switch statement may be better as it relates to industry standard

      if (comment.status == 'approved') {
        content = comment.content;
      }

      if (comment.status == 'pending') {
        content = 'Comment is awaiting moderation.';
      }

      if (comment.status == 'rejected') {
        content = 'Comment has not met approval requirements and has been rejected.';
      }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
