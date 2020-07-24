import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./layout/Landing";
import { ThemeProvider } from "@material-ui/core/styles";
import PostMelon from "./ui/theme";
import { StateContext } from "./config/GlobalState";
import stateReducer from "./config/stateReducer";

function App() {
  const initialState = { posts: [], token: null, userID: null };
  const [store, dispatch] = useReducer(stateReducer, initialState);
  const { posts, token } = store;
  return (
    <div>
      <ThemeProvider theme={PostMelon}>
        <StateContext.Provider value={{ store, dispatch }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route
                exact
                path="/home"
                render={(props) => {
                  return <Home posts={posts} {...props} />;
                }}
              />
            </Switch>
          </Router>
        </StateContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
