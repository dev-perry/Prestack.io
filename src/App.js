import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Core from './layouts/Core';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth" render={props => <Auth {...props}/>} exact/>
        <Route path="/u" render={props => <Core {...props}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
