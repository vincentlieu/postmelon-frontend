import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index from "./layout/Index";
import Home from "./layout/Home";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
