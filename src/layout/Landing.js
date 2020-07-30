import React, { useState } from 'react';
import Register from '../components/users/Register';
import Login from '../components/users/Login';
import {
  Box,
  Grid,
  Paper,
  Link,
  Avatar,
  Button,
  Typography
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Landing = ({ history }) => {
  const [renderRegister, setRenderRegister] = useState(false);
  const [renderLogin, setRenderLogin] = useState(true);

  const classes = useStyles();

  const handleRegister = () => {
    setRenderRegister(true);
    setRenderLogin(false);
  };

  const handleLogin = () => {
    setRenderRegister(false);
    setRenderLogin(true);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className='landing-image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Box my={2}>
            <Button
              onClick={handleLogin}
              className='loginpipe'
              color={renderLogin ? 'primary' : 'inherit'}>
              Login
            </Button>
            <Button
              onClick={handleRegister}
              className='registerpipe'
              color={renderRegister ? 'primary' : 'inherit'}>
              Register
            </Button>
          </Box>
          {(renderRegister && <Register />) ||
            (renderLogin && <Login history={history} />)}
        </Box>
        <Box>
          <Typography variant='body2' color='textSecondary' align='center'>
            Linda Ojinnaka, Patricia Pavia & Vincent Lieu
            <br />
            <Link
              color='inherit'
              href='https://github.com/vincentlieu/postmelon-frontend'>
              <GitHubIcon />
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Landing;
