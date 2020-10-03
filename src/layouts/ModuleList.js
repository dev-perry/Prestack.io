import React from "react";
//reactstrap components
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody
} from "reactstrap";
import {Droppable, Draggable} from "react-beautiful-dnd";

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
