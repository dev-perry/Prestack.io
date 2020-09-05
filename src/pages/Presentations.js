import React, {useState} from "react";
//reactstrap componenets
import {Button} from "reactstrap";
import noPresentations from "../graphics/noPresentations.svg";
import PresentationBuilder from "../components/PresentationBuilder";

function Presentations(){
  const [modal, toggleModal] = useState(false);

  return(
    <>
    <div className="d-flex justify-content-between">
      <Button
        className="mt-3 ml-5 rounded-pill channel-uploadbtn"
        color="primary"
        type="button"
        onClick={() => toggleModal(!modal)}
        >
        <i className="fas fa-plus"></i> New Presentation
      </Button>
    </div>
    <div className="px-3 pt-4 overflow-auto">
      <PresentationBuilder open={modal} toggle={toggleModal}/>
      <img className="w-50" src={noPresentations} alt="No Presentations"/>
    </div>
  </>
  )
}

export default Presentations;
