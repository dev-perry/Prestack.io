import React from "react";
import {Form, Button, Input} from "reactstrap";
// import store from ".../store";

function handleSubmit(e, type){
  e.preventDefault();
  const data = new FormData(e.target);
  let formData = {};
  for (let pair of data.entries()){
    formData = {
      ...formData,
      [pair[0]] : pair[1]
    }
  }
}

export const quiz = (data) => {
  // const optionLabels = ["A", "B", "C", "D"];
  let {choices} = data;
  return(
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "quiz");
      // close()
    }}>
    {
      choices.map(function(choice, index){
        return(
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id={`customRadio${index}`}
            name="customRadio"
            type="radio"
          />
          <label className="custom-control-label" htmlFor={`customRadio${index}`}>
            {choice.text}
          </label>
        </div>
          // <InputGroup className="mb-3">
          //   <InputGroupAddon addonType="prepend">
          //     <InputGroupText><input type="radio"/></InputGroupText>
          //     <InputGroupText>{optionLabels[index]}</InputGroupText>
          //     <InputGroupText>{choice.text}</InputGroupText>
          //   </InputGroupAddon>
          // </InputGroup>
        );
      })
    }
    <div className="text-center">
      <Button className="mx-auto rounded-pill w-50" color="default" type="button">
        Send
      </Button>
    </div>
    </Form>
  )
}

export const cloud = (data) => {
  return(
      <Form role="form" onSubmit={(e) => {
        handleSubmit(e, "cloud");
        // close()
      }}>
        <Input
          placeholder="Type your response here"
        />
        <div className="text-center pt-2">
          <Button className="mx-auto rounded-pill w-50" color="default" type="button">
            Send
          </Button>
        </div>
      </Form>
  )
}

export const poll = (data) => {
  return(
    <Form role="form" onSubmit={(e) => {
      handleSubmit(e, "poll");
      //close()
    }}>
      <div className="text-center pt-2">
      <Button size="lg" type="button" style={{backgroundColor: "#00af91", color: "#FFFFFF"}}>
        YES
      </Button>
      <Button size="lg" type="button" style={{backgroundColor: "#f05454", color: "#FFFFFF"}}>
        NO
      </Button>
    </div>
    </Form>
  )
}
