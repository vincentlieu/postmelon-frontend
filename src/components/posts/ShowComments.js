import React from 'react';
import CreateComment from './CreateComment';
import { Avatar, Box, Divider, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  comment: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },

  profile: {
    marginRight: '10px',
  },
}));

const Comments = ({ postComments, postId }) => {

  const classes = useStyles();

    return (
      <div>
        <CreateComment postId={postId} />
        {postComments.map((comment) => (
          <Container disableGutters={true}>
            <Box
              container
              display='flex'
              alignItems='center'
              marginTop={1}>
              <Avatar src={comment.avatar} className={classes.profile} />
              {comment.name}
            </Box>
            <Box marginY={1}>{comment.content}</Box>
            <Divider />
          </Container>
        ))}
      </div>
    );
}

export default Comments