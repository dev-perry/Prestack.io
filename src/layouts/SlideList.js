import React from "react";
import classnames from "classnames";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button
} from "reactstrap";

function SlideList(props){
  const {showing, toggleWindow, content} = props;
  return(
  <>
    <ListGroup className="mh-75 overflow-auto">
    {content && content.map((item, index) =>
      <ListGroupItem className="border-0 pl-0" key={index}>
       <Badge color="primary" pill>
         {index + 1}
       </Badge>{" "}
       {item.build.label}
      </ListGroupItem>
    )}
    </ListGroup>
    <div className="text-center mt-4">
      <Button
        color="default"
        className={classnames("rounded-pill", {active: !showing})}
        onClick={()=> toggleWindow(true)}>Open Player</Button>
    </div>
  </>
  )
}

export default SlideList;
