import React from 'react';
import Moment from 'react-moment';
import CreateComment from './CreateComment';
import { Avatar, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    width: '100%',
  },
  commentContent: {
    margin: `${theme.spacing(2)}px auto`,
  },
  commentNameTime: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentHeader: {
    display: 'flex',
    margin: `${theme.spacing(2)}px auto`
  },
  postAuthor: {
    marginRight: '10px',
    display: 'flex',
  },
}));

const Comments = ({ postComments, postId }) => {

  const classes = useStyles();

    return (
      <div>
        <CreateComment postId={postId} />
        {postComments.map((comment) => (
          <Box className={classes.commentContainer}>
            <Box className={classes.commentHeader}>
              <Box display='flex' alignItems='center'>
                <Avatar src={comment.avatar} />
                <Box ml={1} className={classes.commentNameTime}>
                  {comment.name}
                    <Moment fromNow>{comment.createdDate}</Moment>
                </Box>
              </Box>
            </Box>
            <Box className={classes.commentContent}>{comment.content}</Box>
            <Divider />
          </Box>
        ))}
      </div>
    );
}

export default Comments