import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap";

function SlideList(){
  return(
    <ListGroup>
   <ListGroupItem className="border-0 pl-0">
     <Badge color="primary" pill>
       1
     </Badge>{" "}
     Spoken Word Video
   </ListGroupItem>
   <ListGroupItem className="border-0 pl-0">
     <Badge color="primary" pill>
       2
     </Badge>{" "}
     Poetry sample.docx
   </ListGroupItem>
   <ListGroupItem className="border-0 pl-0">
     <Badge color="primary" pill>
       3
     </Badge>{" "}
     Participation
   </ListGroupItem>
 </ListGroup>
  )
}

export default SlideList;
