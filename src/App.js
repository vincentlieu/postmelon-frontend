import React, { useReducer, useEffect } from "react";
import localAPI from "./api/localAPI";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./layout/Landing";
import { ThemeProvider } from "@material-ui/core/styles";
import PostMelon from "./ui/theme";
import { Box } from "@material-ui/core";
import { StateContext } from "./config/GlobalState";
import stateReducer from "./config/stateReducer";
import NavBar from "./layout/NavBar";
import Profile from "./layout/Profile";

import EditProfile from "./layout/EditProfile";

function App() {
  const initialState = {
    posts: [],
    token: sessionStorage.token || null,
    userID: sessionStorage.userId || null,
  };
  const [store, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    localAPI.get("/posts/").then((posts) => {
      dispatch({
        type: "setPosts",
        data: posts.data,
      });
    });
    // .then(setIsLoading(!isLoading));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={PostMelon}>
        <StateContext.Provider value={{ store, dispatch }}>
          <Router>
            <NavBar />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => {
                  return <Landing {...props} />;
                }}
              />
              <Route exact path="/profile/:id" component={Profile} />
              <Route
                exact
                path="/home"
                render={(props) => {
                  return <Home {...props} />;
                }}
              />

              <Route exact path="/editprofile/" component={EditProfile} />
            </Switch>
          </Router>
        </StateContext.Provider>
      </ThemeProvider>
    </Box>
  );
}

export default App;
