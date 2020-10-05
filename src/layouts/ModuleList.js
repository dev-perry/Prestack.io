import React from "react";
//reactstrap components
import {
  Row,
  Badge,
  Col,
  Card,
  CardTitle,
  CardBody
} from "reactstrap";
import {Droppable, Draggable} from "react-beautiful-dnd";
import emptySequence from "../graphics/emptySequence.svg";


function ModuleList(props){
  const {modules} = props;

  function iconLoader(type){
    switch (type) {
      case "drive":
        return <i className="fas fa-hdd pr-2"></i>
      case "internet":
        return <i className="fas fa-globe pr-2"></i>
      case "youtube":
        return <i className="fab fa-youtube pr-2"></i>
      case "participation":
        return <i className="fas fa-user-check pr-2"></i>
      default:
        return null
    }
  }

  function tagLoader(module){
    switch(module.build.type){
      case "drive":
        return module.file;
      case "internet":
        return module.link;
      case "youtube":
        return module.videolink;
      default:
        return null
    }
  }


  return(
      <Droppable droppableId="presEditField">
        {
          (provided) => (
            <div
              className="text-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
              {
                !modules.length ?
                <img className="w-75 h-75" src={emptySequence} alt="Empty Presentation"/> :
                modules.map(function(module,position){
                  return (
                    <Draggable draggableId={"prescomp"+position} index={position} key={position}>
                      {(provided)=>(
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          className="card text-center w-75 mx-auto">
                          <CardBody>
                            <Row>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                  {position + 1}
                                </div>
                              </Col>
                              <div className="col">
                                <CardTitle>{iconLoader(module.build.type)}{module.build.label}</CardTitle>
                                <Badge className="mw-75 text-wrap" color="secondary">{tagLoader(module)}</Badge>
                              </div>
                            </Row>
                          </CardBody>
                      </Card>
                      )}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    )
}

export default ModuleList;
