import React, { useEffect, useState } from 'react';
import localAPI from '../../api/localAPI';
import DeletePost from '../posts/DeletePost';
import Moment from 'react-moment';
import { Paper, Grid, Box, Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikePost from '../posts/LikePost';
import Comment from '../posts/Comment';

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

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    localAPI.get('/posts/')
      .then((posts) => setPosts(posts.data));
  }, [posts]);

  return posts.map((post) => (
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
            <LikePost postId={post._id} />
            <Divider />
            <Comment postComments={post.comments} postId={post._id}/>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  ));
};

export default ShowPosts;
