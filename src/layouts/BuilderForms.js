import React from "react";
import {Form, FormGroup, Input, Button} from "reactstrap";
import store from '../store';
import SearchBar from "../components/SearchBar";

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
<Form role="form" onSubmit={(e) => handleSubmit(e, buildfunc)}>
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
</>)
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
<Form role="form" onSubmit={(e) => handleSubmit(e, buildfunc)}>
  <FormGroup>
    <label htmlFor="vidLinkInput">Video Link</label>
    <Input name="video-link" className="form-control-flush" id="vidLinkInput" placeholder="https://youtu.be/videoID" type="url"/>
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

export const driveAssets = buildfunc => {
  return (
    <>
      <div className = "pb-3 text-left" > <h3>Whenever possible:</h3>
        <ol>
          <li>Do not use videos that infringe on copyright law</li>
          <li>Use videos with minimal ads</li>
          <li>Do not use links to private videos</li>
        </ol>
      </div>
  <Form role="form" onSubmit={(e) => handleSubmit(e, buildfunc)}>
    <FormGroup>
      <SearchBar className="w-100" filter="drive"/>
    </FormGroup>
    <FormGroup>
      <label htmlFor="assetSelect" sm={2}>Select Asset</label>
      <Input type="select" name="file" id="assetSelect" size="3">
        {
          store.getState().search.searchResults.map((file, index) => {
            return <option key={index}>{file.name}</option>
          })
        }
      </Input>
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
