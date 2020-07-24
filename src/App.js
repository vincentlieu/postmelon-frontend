import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./layout/Home";
import Landing from "./layout/Landing";
import { ThemeProvider } from '@material-ui/core/styles'
import PostMelon from './ui/theme'
import { Box } from '@material-ui/core';

function App() {
  return (
    <Box>
      <ThemeProvider theme={PostMelon}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Box>
  );
}

export default App;
