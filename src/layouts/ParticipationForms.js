import React, {useState} from "react";
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";
import {newParticipation} from "../actions";
import store from '../store';

function handleSubmit(e, type, choices){
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
  if(choices != null){
    formData = {
      ...formData,
      choices: choices
    }
    store.dispatch(newParticipation(formData));
  }else{
    store.dispatch(newParticipation(formData));
  }
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
      <div className="text-right">
        <Button className="mt-3" color="primary" type="btn">
          Create
        </Button>
      </div>
    </Form>
  </>
  )
}

export const polling = close => {
  return(
    <>
    <h2>Poll</h2>
    <div className= "pb-3 text-left">
      <h4>Remember:</h4>
      <ol>
        <li>Questions should be specific</li>
        <li>Polls receive yes/no responses</li>
        <li>Polling data is not saved</li>
      </ol>
    </div>
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "poll")
      close()
    }}>
      <FormGroup>
        <label htmlFor="title">Name</label>
        <Input name="title" className="form-control-flush" id="title" placeholder="e.g. Current Events Opinion" type="text"/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="prompt">Question</label>
        <Input name="prompt" className="form-control-flush" id="prompt" placeholder="e.g. Is the news today too sensational?" type="text"/>
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
      <div className="text-right">
        <Button className="mt-3" color="primary" type="btn">
          Create
        </Button>
      </div>
    </Form>
  </>
  )
}

// TODO: Make it so that the form cannot be submitted without having at least one non-empty choice that is marked correct
//Code modified from https://codesandbox.io/s/react-dynamic-form-fields-3fjbd?from-embed
export const Quiz = ({close}) => {

const [choices, setChoices] = useState([
  {text: '', isCorrect: false}
]);

const handleChoices = index => {
  if(choices.length === 4)
    return
  const values = [...choices];
  values.splice(index + 1, 0, {text: '', isCorrect: false});
  setChoices(values);
}

const handleRemoval = index => {
  if (choices.length === 1)
    return
  const values = [...choices];
  values.splice(index,1);
  setChoices(values);
}

const handleInputChange = (index, event) => {
  const values = [...choices];
  if(event.target.name === "choice-text"){
    values[index].text = event.target.value;
  }else if(event.target.name === "isCorrect"){
      values[index].isCorrect = event.target.checked;
  }
  setChoices(values);
}

  return(
    <>
    <h2>Quiz</h2>
    <div className= "pb-3 text-left">
      <h4>Remember:</h4>
      <ol>
        <li>Quizzes can have a maximum of four choices</li>
        <li>More than one choice can be marked correct</li>
        <li>Quiz answers are not saved</li>
      </ol>
    </div>
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "quiz", choices)
      close()
    }}>
      <FormGroup>
        <label htmlFor="title">Name</label>
        <Input name="title" className="form-control-flush" id="title" placeholder="e.g. Germ Theory Quiz" type="text"/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="prompt">Question</label>
        <Input name="prompt" className="form-control-flush" id="prompt" placeholder="e.g. Which organism was proven to cause the flu?" type="text"/>
      </FormGroup>
      <FormGroup>
        <small>Toggle the slider to mark a choice as correct</small>
        {choices.map((choice, index) => (
              <InputGroup
                className="pt-2"
                key={`${choice}~${index}`}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <label className="custom-toggle">
                        <input
                          type="checkbox"
                          id="isCorrect"
                          name="isCorrect"
                          checked={choice.isCorrect}
                          onChange={event => handleInputChange(index, event)}
                        />
                        <span
                          className="custom-toggle-slider rounded-circle"
                        />

                      </label>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder={"Choice " + (index + 1)}
                    id="choice-text"
                    name="choice-text"
                    value={choice.text}
                    onChange={event => handleInputChange(index, event)}
                  />
                  <InputGroupAddon>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleRemoval(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleChoices(index)}
                    >
                      +
                    </button>
                  </InputGroupAddon>
              </InputGroup>
          ))}
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
      <div className="text-right">
        <Button className="mt-3" color="primary" type="btn">
          Create
        </Button>
      </div>
    </Form>
  </>
  )
}
