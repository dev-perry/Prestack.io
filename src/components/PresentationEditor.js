import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Modal, Button} from "reactstrap";
import {DragDropContext} from "react-beautiful-dnd";

import ModuleList from "../layouts/ModuleList";
import modules from "../modules";
import {setPresentation} from "../actions";
import emptySequence from "../graphics/emptySequence.svg";

function PresentationEditor(props) {
  const {pres, setPres} = props;
  const [build, updateBuild] = useState([]);

  const addtoBuild = (module) => {
    updateBuild(build.concat(module));
  }

  useEffect(() => {
    if (pres.sequence) {
      updateBuild(pres.sequence);
    }
    return() => {
      setPres({})
    }
    // eslint-disable-next-line
  }, [])

  const onDragEnd = result => {
    //TODO: Reorder tiles
    const {destination, source} = result;
    if(!destination){
      return;
    }
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }
    const resultArray = build;
    const movedPart = build[source.index];
    resultArray.splice(source.index, 1);
    resultArray.splice(destination.index, 0, movedPart);

    updateBuild(resultArray);
  }

  return (
    <DragDropContext
      onDragEnd = {onDragEnd}
      >
      <Modal className="modal-dialog modal-lg" backdrop="static" isOpen={props.open} toggle={() => props.toggle(!props.open)} unmountOnClose={true}>
      <div className="modal-header">
        <div>
          <h6 className="modal-title" id="modal-title-default">
            {pres.title}
          </h6>
          <small>{pres.desc}</small>
        </div>
      </div>
      <div style={{
          height: "50vh"
        }} className="text-center modal-body overflow-auto">
        {
          pres.sequence
            ? <ModuleList modules={pres.sequence}/>
            : (
              build.length > 0
              ? <ModuleList modules={build}/>
              : <img className="w-75 h-75" src={emptySequence} alt="Empty Presentation"/>)
        }
      </div>
      <div className="border-top">
        <div className="py-2 text-center">Add modules:</div>
        <div className="d-flex w-90 justify-content-center">
          {
            modules.map(function(module, index){
              return (
                <Button key={index} onClick={()=>{
                        addtoBuild(module.build)
                        }}
                        className="rounded-pill" color="default" outline="outline">
                        <span>
                          <i className={`${module.icon} pr-2`}></i>{module.label}
                        </span>
                  </Button>
                );
            })
          }
        </div>
      </div>
      <div className="modal-footer">
        <Button className="mr-auto" color="link" data-dismiss="modal" type="button"
          onClick={() => {
          props.toggle(false);
          updateBuild([]);
        }}>
          Close
        </Button>
        <Button color="primary" type="button">
          Save changes
        </Button>

      </div>
    </Modal>
    </DragDropContext>
)
}

function mapStateToProps(state) {
  return {pres: state.presentations.currentPres}
}

const mapDispatchToProps = dispatch => {
  return {
    setPres: (pres) => dispatch(setPresentation(pres))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationEditor);
