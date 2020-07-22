import React, { useState } from 'react';
import { Paper, Grid, Box, Avatar, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikePost from './LikePost';
import DeletePost from './DeletePost';
import Moment from 'react-moment';
import ShowComments from './ShowComments';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
  profile: {
    marginRight: "10px"
  }
}));

const ShowPosts = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles()
  const [comments, setComments] = useState(false)

  return (
    <Paper className={classes.paper} key={post._id}>
      <Grid container={true} wrap='wrap' spacing={2}>
        <Grid container={true} item>
          <Box width={1}>
            <Box container={true} display='flex' justifyContent='space-between'>
              <Box container={true} display='flex' alignItems='center'>
                <Avatar
                  alt='profile-image'
                  src={post.avatar}
                  className={classes.profile}
                />
                {post.name}
              </Box>
              <DeletePost
                postId={post._id}
                onDelete={() =>
                  setPosts(posts.filter((p) => p._id !== post._id))
                }
              />
            </Box>
            <br />
            <div>{post.content}</div>
            <br />
            <Box display='flex' justifyContent='flex-end' width={1}>
              <Moment fromNow>{post.date}</Moment>
            </Box>
            <Box display='flex' justifyContent='flex-end' width={1}>
              <div>Likes: {post.likes.length}</div>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='space-around'>
              <LikePost postId={post._id} />
              <Button
                onClick={() => setComments(!comments)}
                fullWidth
                startIcon={<MessageIcon />}>
                Comments
              </Button>
            </Box>
            <Divider />
            {comments && (
              <ShowComments postComments={post.comments} postId={post._id} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ShowPosts;
