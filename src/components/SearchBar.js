import React from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import classnames from "classnames";

import {useLocation} from "react-router-dom";

function SearchBar(props){

  let location = useLocation();

  const collectionSearch = () => {
    switch (location.pathname) {
      case "/u/drive":
        return "in Drive"
      case "/u/presentations":
        return "Presentations"
      default:
        return null

    }
  }

  return(
    <Form
      className={classnames(
        "navbar-search form-inline mr-sm-3",
        { "navbar-search-light": props.theme === "dark" },
        { "navbar-search-dark": props.theme === "light" }
      )}
    >
      <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-search" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder={`Search ${collectionSearch()}`} type="text" />
        </InputGroup>
      </FormGroup>
      <button
        aria-label="Close"
        className="close"
        type="button"
        onClick={props.closeSearch}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </Form>
  )
}

export default SearchBar;
