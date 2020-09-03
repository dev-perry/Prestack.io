import React, {useState} from "react";
import classnames from "classnames";
import Uploader from "../components/Uploader";
import emptyDrive from "../graphics/emptyDrive.svg";

import {
  Button,
  ButtonGroup
} from "reactstrap";

function Drive(props){
  const [toggleView, setToggle] = useState({
    button: 0
  })
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleOpen = () => setModal(true);

  return (
      <>
        <div className="d-flex justify-content-between">
          <Button onClick={handleOpen} className="mt-3 ml-5 rounded-pill channel-uploadbtn" color="success" type="button">
            <i className="fas fa-plus"></i> Upload Media
          </Button>
          <ButtonGroup className="btn-group-toggle mt-3 mr-4" data-toggle="buttons">
          <Button className={classnames({ active: toggleView.button === 0 })} color="secondary" onClick={() => setToggle({ button: 0 })}>
            <input
              autoComplete="off"
              name="gridView"
              type="radio"
              value={toggleView.button === 0}
            />
            <span><i className="fas fa-th-large pr-2"></i>Grid</span>
          </Button>
          <Button className={classnames({ active: toggleView.button === 1 })} color="secondary" onClick={() => setToggle({ button: 1 })}>
            <input
              autoComplete="off"
              name="listView"
              type="radio"
              value={toggleView.button === 1}
            />
            <span><i className="fas fa-list pr-2"></i>List</span>
          </Button>
        </ButtonGroup>
        </div>
        <div className="text-center">
          <img className="w-50 " src={emptyDrive} alt="Empty Drive"/>
          <Uploader modal={modal} handleClose={handleClose}/>
        </div>
      </>
    );
  }

export default Drive;
