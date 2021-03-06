import React, { useState, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import LikePost from "./LikePost";
import EditPost from "./EditPost";
import PostMenu from "./PostMenu";
import ShowComments from "../comments/ShowComments";
import Moment from "react-moment";
import {
  Paper,
  Box,
  Avatar,
  Divider,
  Button,
  Typography,
  TextField,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
  postContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  postAuthor: {
    marginRight: "10px",
    display: "flex",
  },
  postTime: {
    display: "flex",
    flexDirection: "column",
  },

  postOptions: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const ShowPost = ({ post, deletePost, userID }) => {
  const [editPostFlag, setEditPostFlag] = useState(false);
  const [newPostContent, setNewPostContent] = useState(post.content);
  const [comments, setComments] = useState(false);

  const classes = useStyles();

  const resetEdit = () => {
    setEditPostFlag(!editPostFlag);
    setNewPostContent(post.content);
  };

  const LinkBehaviour = forwardRef((props, ref) => (
    <RouterLink
      ref={ref}
      to={`/profile/${post.authorId}`}
      {...props}
    ></RouterLink>
  ));

  return (
    <Paper className={classes.paper}>
      <Box className={classes.postContainer}>
        {/* POSTHEADER - AVATAR, NAME, TIMESTAMP, DELETE, EDIT */}
        <Box className={classes.postHeader}>
          <Box display="flex" alignItems="center">
            <Avatar
              alt="profile-image"
              src={post.avatar}
              className={classes.postAuthor}
            />
            <Box className={classes.postTime}>
              <Link
                className="view-profile"
                component={LinkBehaviour}
                variant="h6"
                underline="none"
              >
                {post.name}
              </Link>
              <Typography variant="subtitle2">
                <Moment fromNow>{post.date}</Moment>
              </Typography>
            </Box>
          </Box>
          {/* POSTHEADER - MENU OPTIONS - EDIT AND DELETE POST */}
          <Box className="post-menu">
            {editPostFlag && (
              <Box>
                <EditPost
                  value={newPostContent}
                  postId={post._id}
                  confirmChange={() => setEditPostFlag(!editPostFlag)}
                  setNewPostContent={() => setNewPostContent(newPostContent)}
                  cancelChange={() => resetEdit()}
                />
              </Box>
            )}
            {userID === post.authorId ? (
              <PostMenu
                postId={post._id}
                onDelete={deletePost}
                editPost={() => resetEdit()}
              />
            ) : (
              <Box />
            )}
          </Box>
        </Box>

        {/* POSTBODY - CONTENT */}
        {editPostFlag ? (
          <TextField
            className="post-input"
            autoFocus={true}
            fullWidth={true}
            multiline={true}
            variant="outlined"
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
          />
        ) : (
          <Typography paragraph={true}>{post.content}</Typography>
        )}
        <Box display="flex" justifyContent="flex-end">
          <Box display="flex" alignItems="center" m={0.5}>
            <ThumbUpAltIcon color="primary" fontSize="small" />
            {post.likes.length}
          </Box>

          <Box display="flex" alignItems="center">
            <MessageIcon color="primary" fontSize="small" />
            {post.comments.length}
          </Box>
        </Box>

        {/* POST OPTIONS - LIKES AND COMMENTS */}
        <Divider />
        <Box className={classes.postOptions}>
          <LikePost postId={post._id} />
          <Button
            onClick={() => setComments(!comments)}
            fullWidth
            startIcon={<MessageIcon />}
          >
            Comment
          </Button>
        </Box>
        <Divider />

        {/* WHEN COMMENT OPTION IS CLICKED - SHOW/HIDE COMMENTS BENEATH THE POST. */}
        {comments && (
          <ShowComments
            postComments={post.comments}
            postId={post._id}
            linkBehaviour={LinkBehaviour}
          />
        )}
      </Box>
    </Paper>
  );
};

export default ShowPost;
