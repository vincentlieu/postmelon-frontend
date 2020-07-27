import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './layout/Home';
import Landing from './layout/Landing';
import { ThemeProvider } from '@material-ui/core/styles';
import PostMelon from './ui/theme';
import { Box } from '@material-ui/core';
import { StateContext } from './config/GlobalState';
import stateReducer from './config/stateReducer';
import NavBar from './layout/NavBar';
import Profile from './layout/Profile';

function App() {
  const initialState = { posts: [], token: null, userID: null };
  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <Box>
      <ThemeProvider theme={PostMelon}>
        <StateContext.Provider value={{ store, dispatch }}>
          <Router>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => {
                  return <Landing {...props} />;
                }}
              />
              <Route exact path='/profile/user/:id' component={Profile} />
              <Route
                exact
                path='/home'
                render={(props) => {
                  return <Home {...props} />;
                }}
              />
              <Route exact path="/profile/user/:id" component={Profile} />
            </Switch>
          </Router>
        </StateContext.Provider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
