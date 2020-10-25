import React from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button
} from "reactstrap";
import {
  InstantSearch,
  connectAutoComplete,
  connectHits
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import store from '../store';

const ALGOLIA_ID = process.env.REACT_APP_ALGOLIA_ID;

function handleSubmit(e, build) {
  e.preventDefault();
  const state = store.getState();
  const data = new FormData(e.target);
  let formData = {
    build: state.presentations.build
  };
  for (let pair of data.entries()) {
    formData = {
      ...formData,
      [pair[0]]: pair[1]
    }
  }
  build(formData);
}

//Form for WebView module
export const webviewBuild = buildfunc => {
  return (
    <>
    <div className = "pb-3 text-left" > <h3>Whenever possible:</h3>
      <ol>
        <li>Use public web pages</li>
        <li>Do not use links to potentially malicious websites</li>
        <li>Use web pages with minimal cookies</li>
        <li>Do not use web pages that require authentication</li>
      </ol>
    </div>
<Form role = "form"
    onSubmit = {(e) => handleSubmit(e, buildfunc)}
  >
  <FormGroup>
    <label htmlFor="modLinkInput">Link</label>
    <Input name="link" className="form-control-flush" id="modLinkInput" placeholder="https://yourweblinkhere.com" type="url"/>
  </FormGroup>
  <div className="text-right">
    <Button className="mt-3" color="primary" type="btn">
      Add
    </Button>
  </div>
</Form>
</>
)
}

//Form for YouTube module
export const youtubeVideo = buildfunc => {
  return (
    <>
  <div className = "pb-3 text-left" > <h3>Whenever possible:</h3>
    <ol>
      <li>Do not use videos that infringe on copyright law</li>
      <li>Use videos with minimal ads</li>
      <li>Do not use links to private videos</li>
    </ol>
  </div>
<Form role = "form"
  onSubmit = {(e) => handleSubmit(e, buildfunc)}
    >
  <FormGroup>
    <label htmlFor="vidLinkInput">Video Link</label>
    <Input name="videolink" className="form-control-flush" id="vidLinkInput" placeholder="https://youtu.be/videoID" type="url"/>
  </FormGroup>
  <div className="text-right">
    <Button className="mt-3" color="primary" type="btn">
      Add
    </Button>
  </div>
</Form>
  </>
)
}

//Form for drive assets
export const driveAssets = buildfunc => {
  const state = store.getState();
  const client = algoliasearch(ALGOLIA_ID, state.auth.searchKey);

  const SearchBox = ({currentRefinement, refine}) => {
    return(
      <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-search"/>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Search Drive assets"
            type="search"
            value={currentRefinement}
            onChange={e => refine(e.currentTarget.value)}
          />
        </InputGroup>
      </FormGroup>
    )
  }
  //Connect autocomplete search to search field
  const SearchField = connectAutoComplete(SearchBox);

  const Hits = ({hits}) => {
    return(
      <FormGroup>
      <br/>
      <Input name="file" type="select" size="3">
        {
          hits.map((hit, index) => <option key={index}>{hit.name}</option>
        )}
      </Input>
    </FormGroup>
    )
  }
  //connect custom hits to result List
  const CustomHits = connectHits(Hits);

  return (
    <>
    <div className = "pb-3 text-left" > <h3>Remember</h3>
      <ol>
        <li>Ensure that you have selected the correct asset</li>
        <li>Assets added to presentations cannot be deleted from your drive</li>
        <li>Embedded media may not display properly</li>
      </ol>
    </div>
<Form role="form" onSubmit={(e) => handleSubmit(e, buildfunc)}>
  <InstantSearch searchClient={client} indexName="drive">
    <SearchField/>
    <CustomHits/>
  </InstantSearch>
  <div className="text-right">
    <Button className="mt-3" color="primary" type="btn">
      Add
    </Button>
  </div>
</Form>
</>
)
}

export const participationForm = buildfunc => {
  const state = store.getState();
  const client = algoliasearch(ALGOLIA_ID, state.auth.searchKey);

  const SearchBox = ({currentRefinement, refine}) => {
    return(
      <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-search"/>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Search Participation Modules"
            type="search"
            value={currentRefinement}
            onChange={e => refine(e.currentTarget.value)}
          />
        </InputGroup>
      </FormGroup>
    )
  }
  //Connect autocomplete search to search field
  const SearchField = connectAutoComplete(SearchBox);

  const Hits = ({hits}) => {
    return(
      <FormGroup>
      <br/>
      <Input name="details" type="select" size="3">
        {
          hits.map((hit, index) => <option key={index} value={`{"ref": "${hit.participationID}", "name":"${hit.name}"}`}>{hit.name}</option>
        )}
      </Input>
    </FormGroup>
    )
  }
  //connect custom hits to result List
  const CustomHits = connectHits(Hits);

  return (
    <>
    <div className = "pb-3 text-left" > <h3>Remember:</h3>
      <ol>
        <li>Do not end a presentation while a presentation module is running</li>
        <li>Network strength may impact how quickly responses are displayed</li>
        <li>Participation modules do not persist any collected data</li>
      </ol>
    </div>
<Form role="form" onSubmit={(e) => handleSubmit(e, buildfunc)}>
  <InstantSearch searchClient={client} indexName="participation">
    <SearchField/>
    <CustomHits/>
  </InstantSearch>
  <div className="text-right">
    <Button className="mt-3" color="primary" type="btn">
      Add
    </Button>
  </div>
</Form>
</>
)
}
