import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./layout/Home";
import Landing from "./layout/Landing";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
