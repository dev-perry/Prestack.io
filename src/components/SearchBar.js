import React, {useState, useEffect} from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import {
  connectAutoComplete,
  InstantSearch
} from "react-instantsearch-dom";
// import Autosuggest from "react-autosuggest";
import {hitList, searchState} from "../actions";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";

import classnames from "classnames";
import algoliasearch from "algoliasearch/lite";

const ALGOLIA_ID = process.env.REACT_APP_ALGOLIA_ID;

function SearchBar(props) {
  const {
    searchKey,
    searching,
    setHits,
    setSearching
  } = props;

  const [index, setIndex] = useState('drive');
  let location = useLocation();

  const client = algoliasearch(ALGOLIA_ID, searchKey);


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

  const SearchBox = ({currentRefinement, refine, hits}) => {
    const [results, resultsChange] = useState([]);
    useEffect(()=>{
      setHits(results);
    }, [results])

    function handleChange(e){
      refine(e.currentTarget.value);
      resultsChange(hits);
    }

    return (
        <Form
          role="search"
          className={classnames("navbar-search form-inline mr-sm-3", {
            "navbar-search-light": props.theme === "dark"
          }, {
            "navbar-search-dark": props.theme === "light"
          })}
          onSubmit={e => {
            e.preventDefault();
          }}
          >
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
                onChange={e => handleChange(e)}
                onFocus={()=> setSearching(true)}
                onBlur={()=> setSearching(false)}
              />
            </InputGroup>
            {(searching && hits.length === 0) && <div>No matching results.</div>}
          </FormGroup>
          <button aria-label="Close" className="close" type="button" onClick={props.closeSearch}>
            <span aria-hidden={true}>×</span>
          </button>
        </Form>
  )
  }

  const SearchField = connectAutoComplete(SearchBox);

  return (
    <InstantSearch className="position-absolute" searchClient={client} indexName={index}>
    <SearchField
      searchAsYouType={false}
    />
  </InstantSearch>
)

}

function mapStateToProps(state) {
  return {
    searchKey: state.auth.searchKey,
    searching: state.search.isSearching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHits: (hits) => dispatch(hitList(hits)),
    setSearching: (state) => dispatch(searchState(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
