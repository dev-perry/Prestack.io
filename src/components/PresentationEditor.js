import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import {Modal, Button} from "reactstrap";
import {DragDropContext} from "react-beautiful-dnd";

import ModuleList from "../layouts/ModuleList";
import modules from "../modules";
import {setPresentation, setConstruct, updatePresSequence} from "../actions";

function PresentationEditor(props) {
  const {pres, setPres, setBuild, updateSeq} = props;
  const [build, updateBuild] = useState([]);
  const [modal, updateModal] = useState({
    open: false,
    content: null
  });
  let original = useRef();

  function addtoBuild(construct) {
    updateBuild(build.concat(construct));
    closeModal();
  }

  function sendUpdate(){
    if(original.current === build){
      // props.toggle(false);
      console.log(original.current);
      console.log("There has been no change");
      console.log(build);
    }else{
      console.log(original.current);
      console.log("There has been a change");
      // console.log(build);
      updateSeq(build, pres.id);
      props.toggle(false);
      // setPres({});
    }
  }

  const openModal = (build, form) => {
    setBuild(build);
    updateModal({
      open: true,
      content: form(addtoBuild)
  })
};

  const closeModal = () => {
    setBuild({});
    updateModal({
    open: false,
    content: null
  })}

  const BuildDetail = () => {
    return (
      <Modal
        className="modal-dialog"
        isOpen={modal.open}
        backdrop={"static"}
        >
      <div className="modal-header">
        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={closeModal}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        {modal.content}
      </div>
    </Modal>
  )
  }

  useEffect(() => {
    if (pres.sequence) {
      updateBuild(pres.sequence);
      original.current = pres.sequence;
    }
    // eslint-disable-next-line
  },[pres.sequence])

  const onDragEnd = result => {
    //TODO: Reorder tiles
    const {destination, source} = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
      let resultArray = build;
      let movedPart = build[source.index];
      resultArray.splice(source.index, 1);
      resultArray.splice(destination.index, 0, movedPart);
      // console.log(resultArray);
      updateBuild([...resultArray]);
  }

  return (
    <>
    <BuildDetail/>
    <DragDropContext onDragEnd={onDragEnd}>
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
            <ModuleList modules={build}/>
      </div>
      <div className="border-top">
        <div className="py-2 text-center">Add modules:</div>
        <div className="d-flex w-90 justify-content-center">
          {
            modules.map(function(module, index) {
              return (
                <Button key={index}
                  onClick={() => {
                  openModal(module.build, module.form)
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
            setPres({});
          }}>
          Close
        </Button>
        <Button
          onClick={sendUpdate}
          color="primary"
          type="button">
          Save changes
        </Button>

      </div>
    </Modal>
  </DragDropContext>
</>
)
}

function mapStateToProps(state) {
  return {
    pres: state.presentations.currentPres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPres: (pres) => dispatch(setPresentation(pres)),
    setBuild: (build) => dispatch(setConstruct(build)),
    updateSeq: (sequence, id) => dispatch(updatePresSequence(sequence, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationEditor);
