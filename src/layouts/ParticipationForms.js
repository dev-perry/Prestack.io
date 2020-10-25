import React from "react";
import {
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import {newParticipation} from "../actions";
import store from '../store';

function handleSubmit(e, type){
  e.preventDefault();
  const data = new FormData(e.target);
  let formData = {
    type: type
  };
  for (let pair of data.entries()) {
    formData = {
      ...formData,
      [pair[0]]: pair[1]
    }
  }
  store.dispatch(newParticipation(formData));
}

export const wordCloud = close => {
  return(
    <>
    <h2>Word Cloud</h2>
    <div className= "pb-3 text-left">
      <h4>Remember:</h4>
      <ol>
        <li>Make your opener engaging</li>
        <li>Word cloud submissions are anonymous</li>
        <li>Word clouds work best in large groups</li>
      </ol>
    </div>
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "cloud")
      close()
    }}>
      <FormGroup>
        <label htmlFor="title">Name</label>
        <Input name="title" className="form-control-flush" id="title" placeholder="e.g. Daily Check-in?" type="text"/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="prompt">Opener</label>
        <Input name="prompt" className="form-control-flush" id="prompt" placeholder="e.g. How are you feeling today?" type="text"/>
      </FormGroup>
      <FormGroup>
        <label
          className="form-control-label"
          htmlFor="example-number-input"
        >
          Duration (in seconds)
            </label>
            <Input
              className="form-control-flush"
              defaultValue="60"
              id="example-number-input"
              type="number"
              name="duration"
              step="60"
              min="60"
              max="180"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label-2"
              htmlFor="example-number-input-2"
            >
              Participation Points
                </label>
                <Input
                  className="form-control-flush"
                  defaultValue="2"
                  id="example-number-input-2"
                  type="number"
                  name="points"
                  step="2"
                  min="2"
                  max="10"
                />
              </FormGroup>
      <div className="text-right">
        <Button className="mt-3" color="primary" type="btn">
          Create
        </Button>
      </div>
    </Form>
  </>
  )
}

export const photoWall = close => {
  return(
    <>
    <h2>Photo Wall</h2>
    <div className= "pb-3 text-left">
      <h4>Remember:</h4>
      <ol>
        <li>Students will be prompted to take photos in real-time</li>
        <li>Include captioning guidelines in your directions</li>
        <li>All submitted photos are deleted when you close your presentation</li>
      </ol>
    </div>
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "photo")
      close()
    }}>
      <FormGroup>
        <label htmlFor="title">Name</label>
        <Input name="title" className="form-control-flush" id="title" placeholder="e.g. Practice Problem Submission" type="text"/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="prompt">Directions</label>
        <Input name="prompt" className="form-control-flush" id="prompt" placeholder="e.g. Send in a photo of your solution, include any questions you may have in the caption" type="textarea" style={{
            resize: 'none'
          }}/>
      </FormGroup>
      <FormGroup>
        <label
          className="form-control-label"
          htmlFor="example-number-input"
        >
          Duration (in seconds)
            </label>
            <Input
              className="form-control-flush"
              defaultValue="60"
              id="example-number-input"
              type="number"
              name="duration"
              step="60"
              min="60"
              max="240"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label-2"
              htmlFor="example-number-input-2"
            >
              Participation Points
                </label>
                <Input
                  className="form-control-flush"
                  defaultValue="2"
                  id="example-number-input-2"
                  type="number"
                  name="points"
                  step="2"
                  min="2"
                  max="10"
                />
              </FormGroup>
      <div className="text-right">
        <Button className="mt-3" color="primary" type="btn">
          Create
        </Button>
      </div>
    </Form>
  </>
  )
}
