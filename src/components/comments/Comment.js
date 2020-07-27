import React, { useState } from 'react';
import { Avatar, Box, Divider, TextField, Typography } from '@material-ui/core';
import Moment from 'react-moment';
import CommentMenu from './CommentMenu';
import { makeStyles } from '@material-ui/core/styles';
import EditComment from './EditComment';
import { useGlobalState } from '../../config/GlobalState';

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    width: '100%',
    justifyContent: 'space-between',
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
    margin: `${theme.spacing(2)}px auto`,
    justifyContent: 'space-between',
  },
  postAuthor: {
    marginRight: '10px',
    display: 'flex',
  },
  commentMenu: {
    display: 'flex',
      justifyContent: 'space-around',
    alignItems: 'center'
  },
}));

const Comment = ({ comment, postId }) => {
  const [editCommentFlag, setEditCommentFlag] = useState(false);
  const [editCommentValue, setEditCommentValue] = useState('');
  const {store} = useGlobalState();
  const { userID } = store;
  const classes = useStyles();

  function editComment(comment) {
    setEditCommentFlag(!editCommentFlag);
    setEditCommentValue(comment.content);
  }

  return (
    <Box className={classes.commentContainer}>
      {/* COMMENTHEADER - AVATAR, NAME, TIMESTAMP, DELETE, EDIT */}
      <Box className={classes.commentHeader}>
        <Box display='flex' alignItems='center'>
          <Avatar src={comment.avatar} />
          <Box ml={1} className={classes.commentNameTime}>
            <Typography variant='subtitle2'>{comment.name}</Typography>
            <Typography variant='subtitle2'>
              <Moment fromNow>{comment.createdDate}</Moment>
            </Typography>
          </Box>
        </Box>
        {/* COMMENTMENU - MENU OPTIONS - EDIT AND DELETE COMMENT */}
        <Box className={classes.commentMenu}>
          {editCommentFlag && (
            <Box className={classes.commentMenu}>
              <EditComment
                postId={postId}
                commentId={comment._id}
                commentContent={editCommentValue}
                commentFlag={() => setEditCommentFlag(!editCommentFlag)}
                setNewCommentContent={() =>
                  setEditCommentValue(editCommentValue)
                }
              />
            </Box>
          )}
          {userID === comment.user ? <CommentMenu
            commentId={comment._id}
            postId={postId}
            editComment={() => editComment(comment)}
          /> : <Box />}
        </Box>
      </Box>

      {/* COMMENTBODY - CONTENT */}
      {editCommentFlag ? (
        <TextField
          fullWidth={true}
          multiline={true}
          variant='outlined'
          value={editCommentValue}
          onChange={(event) => setEditCommentValue(event.target.value)}
        />
      ) : (
        <Box className={classes.commentContent}>{comment.content}</Box>
      )}
      <Divider />
    </Box>
  );
};

export default Comment;
