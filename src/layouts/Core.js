import React from "react";
import {Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
// core components
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import PrivateRoute from "../components/PrivateRoute";
//routes
import buildRoutes from "../routes";

class Core extends React.Component {

  state = {
    sidenavOpen: true,
    routes: buildRoutes(this.props.attributes.teaching)
  };
  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
    if(e.attributes !== this.props.attributes){
      this.setState({
        routes: buildRoutes(this.props.attributes.teaching)
      })
    }
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse && prop.views.length > 0) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "admin") {
        return (
          <PrivateRoute
            path={"/c" + prop.path}
            component={prop.component}
            key={key}
            isAuthenticated={this.props.isAuthenticated}
            isVerifying={this.props.isVerifying}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < this.state.routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          this.state.routes[i].path
        ) !== -1
      ) {
        return this.state.routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    });
  };
  getNavbarTheme = () => {
    return this.props.location.pathname.indexOf(
      "admin/alternative-dashboard"
    ) === -1
      ? "dark"
      : "light";
  };

  render(){
    return (
      <>
        <Sidebar
          {...this.props}
          routes={this.state.routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
          logo={{
            innerLink: "/drive",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div
          className="main-content"
          ref="mainContent"
          onClick={this.closeSidenav}
        >
          <AdminNavbar
            {...this.props}
            theme={this.getNavbarTheme()}
            toggleSidenav={this.toggleSidenav}
            sidenavOpen={this.state.sidenavOpen}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(this.state.routes)}
            <Redirect from="*" to="/c/drive"/>
          </Switch>
          <AdminFooter/>
        </div>
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null}
      </>
    );
}
}

function mapStateToProps(state){
  return{
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    attributes: state.auth.attributes
  }
}

export default connect(mapStateToProps)(Core);
