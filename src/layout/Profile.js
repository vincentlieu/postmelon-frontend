import React, { useState, useEffect } from "react";
import { useGlobalState } from "../config/GlobalState";
import localAPI from "../api/localAPI";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import ShowPost from "../components/posts/ShowPost";
import Moment from "react-moment";
import { Container, Box, Paper, Typography, Modal, IconButton, Button, Divider, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import PostsIcon from '@material-ui/icons/RateReview';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Profile = () => {
  const { store } = useGlobalState();
  const { posts, userID } = store;
  const [userDetails, setUserDetails] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [isDelete, setIsdelete] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  let { id } = useParams();

  const userPosts = posts.filter((post) => {
    return post.authorId === id;
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await localAPI.get(`/users/${id}`);
        setUserDetails(response.data);
        setUserFriends(response.data.friends);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {userFriends.map((friend) => (
        <div>
          {friend.name}
          <Divider/>
        </div>
      ))}
    </div>
  );

  const removeUser = () => {
    try {
      (async () => {
        const response = await localAPI.delete(`/users/`);
        setIsdelete(true);
      })();
    } catch (e) {
      console.log(e);
    }
  };

  const addfriend = () => {
    try {
      (async () => {
        const response = await localAPI.put(`/users/friend/${id}`);
        console.log(response)
      })();
    } catch (e) {
      console.log(e);
    }
  };

  return userDetails && userFriends ? (
    <Container
      className='profile-container'
      maxWidth='sm'
      disableGutters={true}>
      <Paper className='profile-pic-info'>
        <img src={userDetails.avatar} alt='profile image' />
        <Box className='profile-info'>
          <Box className='name-add'>
            <Typography variant='h6' color='primary' className='card-title'>
              {userDetails.name}
            </Typography>
            {/* SHOW ADD FRIEND BUTTON WHEN THE PROFILE IS NOT THE LOGGED IN USER */}
            {userID != id ? (
              <Tooltip title="Add friend">
              <IconButton
                onClick={addfriend}
                type='button'
                className=' btn btn-secondary background-color text-white'>
                <PersonAddIcon />
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Delete account">
              <IconButton
                className='add-friends-remove-account'
                onClick={removeUser}>
                <DeleteForeverIcon />
                </IconButton>
                </Tooltip>
            )}
          </Box>
          <Typography variant='subtitle2' className='font-weight-bold'>
            Joined: <Moment format='YYYY/MM/DD'>{userDetails.date}</Moment>
          </Typography>
          <Box className='post-likes-counter' alignSelf='flex-end'>
            <Button
              className='display-posts-count'
              color='primary'
              startIcon={<PostsIcon />}>
              {userPosts.length}
            </Button>
            <Tooltip title='View friends list'>
            <Button
              onClick={handleOpen}
              startIcon={<PeopleIcon />}
              color='primary'>
              {userFriends.length}
            </Button>
          </Tooltip>
          </Box>
          <Typography>
            {userDetails.bio ? (
              userDetails.bio
            ) : (
              <Typography variant='subtitle1'>
                No biography specified.
              </Typography>
            )}
          </Typography>
        </Box>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}>
        {body}
      </Modal>
      
      <div>
        {userPosts.map((post) => {
          return <ShowPost post={post} userID={userID}/>;
        })}
        {isDelete && <Redirect to='/'></Redirect>}
      </div>
    </Container> ) : (
    <div>
      <h1>No profile for this user</h1>
    </div>
  )
}


export default Profile;
