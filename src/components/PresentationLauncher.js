import React, {useEffect, useState} from "react";
import {
  Modal,
  Form,
  FormGroup,
  Button,
  Input
} from "reactstrap";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

function PresentationLauncher(props){
  const {attributes, presID} = props
  const [selection, setSelect] = useState("");
  const [classArray, setClasses] = useState([]);
  let history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    history.push(`/s/${presID}?class=${selection}`);
  }

  function handleChange(e){
    setSelect(e.target.value)
  }

  useEffect(()=>{
    if(attributes != null){
      setClasses(attributes.teaching);
    }
  },[attributes])

  useEffect(()=>{
    if(classArray != null && classArray.length){
      setSelect(classArray[0].id);
    }
  },[classArray])

  return(
    <Modal
        className="modal-dialog-centered"
        isOpen={props.open}
        toggle={() => props.toggle(!props.open)}
      >
        <div className="modal-body">
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <label htmlFor="exampleFormControlSelect1">Select class</label>
                  <Input id="exampleFormControlSelect1" type="select" value={selection} onChange={handleChange}>
                    {
                      classArray != null && classArray.map((item) => <option value={item.id}>{item.name}</option> )
                    }
                  </Input>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Launch in Preview Mode</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                  >
                    Launch
                  </Button>
                </div>
              </Form>
        </div>
      </Modal>
  )
}

function mapStateToProps(state){
  return{
    attributes: state.auth.attributes
  }
}

export default connect(mapStateToProps)(PresentationLauncher);
