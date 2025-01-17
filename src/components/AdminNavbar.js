import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../actions";
import firebase from '../firebase';
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

import SearchBar from "./SearchBar";

function AdminNavbar(props){
  const storage = firebase.storage();
  const {user, logout} = props;
  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  useEffect(()=>{
    if(user.uid){
      storage.ref(`users/${user.uid}/avatar.jpg`).getDownloadURL()
      .then(url => {
        var img = document.getElementById('userAvatarPicture');
        img.src = url;
      }).catch(function(error){
        console.log(error)
      })
    }
    //eslint-disable-next-line
  },[user])

    return (
      <>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            // { "navbar-dark bg-info": props.theme === "dark" },
            // { "navbar-light bg-secondary": props.theme === "light" }
          )}
          style={{
            backgroundColor: "#222831",
            color: "#eeeeee"
          }}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              <SearchBar theme={props.theme} closeSearch={closeSearch}/>

              <Nav className="align-items-center ml-md-auto" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: props.sidenavOpen },
                      { "sidenav-toggler-dark": props.theme === "dark" }
                    )}
                    onClick={props.toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>
                <NavItem className="d-sm-none">
                  <NavLink onClick={openSearch}>
                    <i className="ni ni-zoom-split-in" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          id="userAvatarPicture"
                          alt="..."
                          src={require("../graphics/userAvatarDefault.jpg")}
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {user.displayName}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span>Subscription</span>
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={() => logout()}
                    >
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark"
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};

function mapStateToProps(state){
  return{
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    logout: () => dispatch(logoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
