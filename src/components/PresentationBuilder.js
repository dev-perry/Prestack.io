import React from "react";
// reactstrap components
import {
  Button,
  Modal
} from "reactstrap";

function PresentationBuilder(props){
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
      <div className="modal-body">...</div>
      <div className="modal-footer">
        <Button color="primary" type="button">
          Create
        </Button>
      </div>
    </Modal>
  )
}

export default PresentationBuilder;
