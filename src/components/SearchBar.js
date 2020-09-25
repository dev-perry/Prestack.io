import React, {useState} from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import {
  // connectSearchBox,
  connectAutoComplete,
  connectStateResults,
  // connectHits,
  InstantSearch,
  Hits
  // Index,
  // Configure,
} from "react-instantsearch-dom";
// import Autosuggest from "react-autosuggest";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";

import classnames from "classnames";
import algoliasearch from "algoliasearch/lite";

const ALGOLIA_ID = process.env.REACT_APP_ALGOLIA_ID;

function SearchBar(props) {
  const {searchKey} = props;

  const [index, setIndex] = useState('drive');

  let location = useLocation();

  const collectionSearch = () => {
    switch (location.pathname) {
      case "/u/drive":
        setIndex('drive');
        return "in Drive"
      case "/u/presentations":
        setIndex('presentations');
        return "Presentations"
      default:
        return null
    }
  }

  const Results = connectStateResults(({ searchState, searchResults, children }) =>
  searchState && searchState.query ? (
        searchResults && searchResults.nbHits !== 0 ? (
          children
        ) : (
          <div>No matching results.</div>
        )
  ) : (
    null
  )
);

  const SearchBox = ({currentRefinement, refine, hits}) => {

    return (
        <Form role="search" className={classnames("navbar-search form-inline mr-sm-3", {
            "navbar-search-light": props.theme === "dark"
          }, {
            "navbar-search-dark": props.theme === "light"
          })}>
          <FormGroup className="mb-0">
            <InputGroup className="input-group-alternative input-group-merge">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search"/>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder={`Search ${collectionSearch()}`}
                type="search"
                value={currentRefinement}
                onChange={e => refine(e.currentTarget.value)}/>
            </InputGroup>
          </FormGroup>
          <Results>
            <Hits/>
          </Results>
          <button aria-label="Close" className="close" type="button" onClick={props.closeSearch}>
            <span aria-hidden={true}>×</span>
          </button>
        </Form>
  )
  }

  const SearchBar = connectAutoComplete(SearchBox);

  const client = algoliasearch(ALGOLIA_ID, searchKey);

  return (
    <InstantSearch searchClient={client} indexName={index}>
    <SearchBar/>
  </InstantSearch>
)

}

function mapStateToProps(state) {
  return {searchKey: state.auth.searchKey}
}

export default connect(mapStateToProps)(SearchBar);
