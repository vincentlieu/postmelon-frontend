import React, { useReducer, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./layout/Landing";
import { ThemeProvider } from '@material-ui/core/styles'
import PostMelon from './ui/theme'
import { Box } from '@material-ui/core';
import { StateContext } from "./config/GlobalState";
import stateReducer from "./config/stateReducer";
import localAPI from './api/localAPI';

function App() {
  const initialState = { posts: [], token: null, userID: null };
  const [store, dispatch] = useReducer(stateReducer, initialState);
  const { posts, token } = store;
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      localAPI
        .get('/posts/')
        .then((posts) => {
          dispatch({ type: 'setPosts', data: posts.data });
        })
        .then(setIsLoading(!isLoading));
    }, []);
  
  return (
    <Box>
      <ThemeProvider theme={PostMelon}>
        <StateContext.Provider value={{ store, dispatch }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/home"
                render={(props) => {
                  return <Home posts={posts} {...props} isLoading={isLoading}/>;
                }}
              />
            </Switch>
          </Router>
        </StateContext.Provider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
