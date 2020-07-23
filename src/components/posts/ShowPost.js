import React, { useState } from 'react';
import { Paper, Box, Avatar, Divider, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikePost from './LikePost';
import DeletePost from './DeletePost';
import Moment from 'react-moment';
import ShowComments from './ShowComments';
import MessageIcon from '@material-ui/icons/Message';
import EditPost from './EditPost';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
  postContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  postAuthor: {
    marginRight: '10px',
    display: 'flex',
  },
  postTime: {
    display: 'flex',
    flexDirection: 'column',
  },
  postOptions: {
    display : 'flex',
    justifyContent: 'space-around'
  }
}));

const ShowPosts = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const [editPostFlag, setEditPostFlag] = useState(false)
  const [newPostContent, setNewPostContent] = useState(post.content)
  const [comments, setComments] = useState(false)
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.postContainer}>
        
        {/* POSTHEADER - AVATAR, NAME, TIMESTAMP, DELETE, EDIT */}
        <Box className={classes.postHeader}>
          <Box display='flex' alignItems='center'>
            <Avatar alt='profile-image' src={post.avatar} className={classes.postAuthor}/>
            <Box className={classes.postTime}>
              <Typography variant='h6'>{post.name}</Typography>
              <Typography variant='subtitle2'>
                <Moment fromNow>{post.date}</Moment>
              </Typography>
            </Box>
          </Box>
          <DeletePost
            postId={post._id}
            onDelete={() => setPosts(posts.filter((p) => p._id !== post._id))}
          />
        </Box>

        {/* POSTBODY - CONTENT */}
        {editPostFlag ? <input value={newPostContent} onChange={event => setNewPostContent(event.target.value)} /> : <Box>{post.content}</Box>}
        <Box display='flex' justifyContent='flex-end'>
          <div>Likes: {post.likes.length}</div>
          {!editPostFlag ? <button onClick={() => setEditPostFlag(!editPostFlag)}>Edit post</button> : <EditPost value={newPostContent} postId={post._id} confirmChange={() => setEditPostFlag(!editPostFlag)}>Confirm Changes</EditPost> }
        </Box>

        {/* POST OPTIONS - LIKES AND COMMENTS */}
        <Divider />
        <Box className={classes.postOptions}>
          <LikePost postId={post._id} postLikes={post.likes} />
          <Button
            onClick={() => setComments(!comments)}
            fullWidth
            startIcon={<MessageIcon />}>
            Comments
          </Button>
        </Box>
        <Divider />
        
        {/* WHEN COMMENT OPTION IS CLICKED - SHOW/HIDE COMMENTS BENEATH THE POST. */}
        {comments && (<ShowComments postComments={post.comments} postId={post._id} />)}

      </Box>
    </Paper>
  );
};

export default ShowPosts;
