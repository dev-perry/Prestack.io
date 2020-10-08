import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import SlideShow from "./pages/SlideShow";

import Core from './layouts/Core';
import Auth from './pages/Auth';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/auth" render={props => <Auth {...props}/>} exact/>
        <Route path="/c" render={props => <Core {...props}/>}/>
        <PrivateRoute path="/s/:presid" component={SlideShow} isAuthenticated={props.isAuthenticated} isVerifying={props.isVerifying} exact/>
        <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  );
}

function mapStateToProps(state){
  return{
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App);
