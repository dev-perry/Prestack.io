import React from "react";
import {connect} from "react-redux";
// reactstrap components
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  Label,
  FormText
} from "reactstrap";

import {createPresentation} from "../actions";

function PresentationBuilder(props){
  const {create} = props;

  function handleSubmit(e){
    e.preventDefault();
    props.toggle(!props.open);
    const data = new FormData(e.target);
    let formData = {};

    for (let pair of data.entries()) {
      formData = {...formData, [pair[0]]: pair[1]}
    }
    // console.log(formData);
    create(formData);
}

  return(
    <Modal
      className="modal-dialog"
      isOpen={props.open}
      toggle={() => props.toggle(!props.open)}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          New Presentation
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => props.toggle(!props.open)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body pt-0">
        <Form role="form" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="presTitleInput">Title</label>
            <Input
              name="title"
              className="form-control-flush"
              id="presTitleInput"
              placeholder="e.g. Lecture 2A, Plant Roots Overview"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="presDescInput">Description</label>
            <Input
              name="desc"
              className="form-control-flush"
              placeholder="e.g. This presentation explains the meaning of life."
              id="presDescInput"
              type="textarea"
              style={{resize: 'none'}}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                name="downloadable"
                className="form-control-flush"
                type="checkbox"
                id="presDownloadCheck" />{' '}
              Allow participant downloads
            </Label>
            <FormText>When checked, members of any class you assign this presentation to will be able to download all files and media included in this presentation.</FormText>
          </FormGroup>
          <div className="text-right">
            <Button className="mt-3" color="primary" type="btn">
              Create
            </Button>
          </div>
      </Form>
      </div>
    </Modal>
  )
}

function mapStateToProps(state){
  return{
    isCreating: state.presentations.isCreating
  }
}

const mapDispatchToProps = dispatch => {
  return{
    create: (pres) => dispatch(createPresentation(pres))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationBuilder);
