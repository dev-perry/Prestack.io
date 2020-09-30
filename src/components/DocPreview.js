import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";
import MediaWindow from './MediaWindow';

function DocPreview(props) {
  return (
    <Modal className="modal-dialog modal-lg" isOpen={props.open} toggle={() => props.toggle(!props.open)} unmountOnClose={true}>
    <div className="modal-header">
      <h6 className="modal-title" id="modal-title-default">
        Drive Asset Preview
      </h6>
    </div>
    <div className="modal-body p-0">
      <MediaWindow/>
    </div>
    <div className="modal-footer">
      <Button className="ml-auto" color="link" data-dismiss="modal" type="button" onClick={() => props.toggle(false)}>
        Close
      </Button>
    </div>
  </Modal>
)
}

export default DocPreview;
