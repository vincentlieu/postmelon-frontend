import React, { useState } from 'react';
import { Paper, Box, Avatar, Divider, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikePost from './LikePost';
import Moment from 'react-moment';
import ShowComments from './ShowComments';
import MessageIcon from '@material-ui/icons/Message';
import EditPost from './EditPost';
import PostMenu from './PostMenu';

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
  postMenu: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  postOptions: {
    display : 'flex',
    justifyContent: 'space-around'
  }
}));

const ShowPost = ({ post, deletePost }) => {
  const [posts, setPosts] = useState([]);
  const [editPostFlag, setEditPostFlag] = useState(false)
  const [newPostContent, setNewPostContent] = useState(post.content)
  const [comments, setComments] = useState(false)
  const classes = useStyles();

  const resetEdit = () => {
    setEditPostFlag(!editPostFlag);
    setNewPostContent(post.content);
  }

  return (
    <Paper className={classes.paper}>
      <Box className={classes.postContainer}>
        {/* POSTHEADER - AVATAR, NAME, TIMESTAMP, DELETE, EDIT */}
        <Box className={classes.postHeader}>
          <Box display='flex' alignItems='center'>
            <Avatar
              alt='profile-image'
              src={post.avatar}
              className={classes.postAuthor}
            />
            <Box className={classes.postTime}>
              <Typography variant='h6'>{post.name}</Typography>
              <Typography variant='subtitle2'>
                <Moment fromNow>{post.date}</Moment>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.postMenu}>
            {editPostFlag && (
              <Box className={classes.postMenu}>
                <EditPost
                  value={newPostContent}
                  postId={post._id}
                  confirmChange={() => setEditPostFlag(!editPostFlag)}
                  setNewPostContent={() => setNewPostContent(newPostContent)}
                  cancelChange={() => resetEdit()}
                />
              </Box>
            )}
            <PostMenu
              postId={post._id}
              onDelete={deletePost}
              onDelete={() => { resetEdit(); setPosts(posts.filter((p) => p._id !== post._id)) }}
              editPost={() => resetEdit()}
            />
          </Box>
        </Box>

        {/* POSTBODY - CONTENT */}
        {editPostFlag ? (
          <TextField
            fullWidth={true}
            multiline={true}
            variant='outlined'
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
          />
        ) : (
          <Box>{post.content}</Box>
        )}
        <Box display='flex' justifyContent='flex-end'>
          <div>Likes: {post.likes.length}</div>
        </Box>

        {/* POST OPTIONS - LIKES AND COMMENTS */}
        <Divider />
        <Box className={classes.postOptions}>
          <LikePost postId={post._id} />
          <Button
            onClick={() => setComments(!comments)}
            fullWidth
            startIcon={<MessageIcon />}>
            Comment
          </Button>
        </Box>
        <Divider />

        {/* WHEN COMMENT OPTION IS CLICKED - SHOW/HIDE COMMENTS BENEATH THE POST. */}
        {comments && (
          <ShowComments postComments={post.comments} postId={post._id} />
        )}
      </Box>
    </Paper>
  );
};

export default ShowPost;
