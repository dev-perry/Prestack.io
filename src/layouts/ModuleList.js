import React from "react";
//reactstrap components
import {
  Badge,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col
} from "reactstrap";

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
    <div className="d-flex flex-wrap align-items-start">
      {
        modules.map(function(module,position){
          return (
              <Card className="card w-25 text-center px-3" key={position}>
                <CardBody>
                  <CardTitle>{iconLoader(module.type)}{module.name}</CardTitle>
                </CardBody>
                <CardFooter>
                  <Badge>
                    {position + 1}
                  </Badge>
                </CardFooter>
            </Card>
          )
        })
      }
    </div>
  )
}

export default ModuleList;
