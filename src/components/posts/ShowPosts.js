import React, { useEffect, useState } from "react";
import localAPI from "../../api/localAPI";
import DeletePost from "../posts/DeletePost";
import Moment from "react-moment";
import { Paper, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
}));

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    localAPI.get("/posts/").then((posts) => {
      setPosts(posts.data);
      console.log(posts.data);
    });
  }, []);

  return posts.map((post) => (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item container>
          <Box width={1}>
            <Box container display="flex" justifyContent="space-between">
              {post.authorId}
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
            <Box display="flex" justifyContent="flex-end" width={1}>
              <Moment fromNow>{post.createdDate}</Moment>
            </Box>
            <Box display="flex" justifyContent="flex-end" width={1}>
              <div>Likes: {post.likes.length}</div>
            </Box>
          </Box>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Paper>
  ));
};

{
  /* <div>
  <div>Author: {post.authorId}</div>
  <div>Content: {post.content}</div>
  <div>Likes: {post.likes.length}</div>
  <div>
    <Moment fromNow>{post.createdDate}</Moment>
  </div>
  <DeletePost
    postId={post._id}
    onDelete={() => setPosts(posts.filter((p) => p._id !== post._id))}
  />
</div>; */
}

export default ShowPosts;
