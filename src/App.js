import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import SlideShowBox from "./components/SlideShowBox";


import Core from './layouts/Core';
import Auth from './pages/Auth';

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/auth" render={props => <Auth {...props}/>} exact/>
        <Route path="/c" render={props => <Core {...props}/>}/>
        <PrivateRoute path="/s/player/:showid" component={SlideShowBox} isAuthenticated={props.isAuthenticated} isVerifying={props.isVerifying} exact/>
        <Redirect to="/"/>
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
