import React from 'react';
import CreateComment from './CreateComment';

const Comments = ({ postComments, postId}) => {

    return (
      <div>
            <CreateComment postId={postId}/>
        {postComments.map((comment) => 
            <div>
                <div>{comment.name}</div>
                <div>{comment.content}</div>
          </div>
        )}
      </div>
    );
}

export default Comments