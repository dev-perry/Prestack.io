import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
}from "reactstrap";

import {getDate} from "../firebase/actions";

//Selecting random colors
// const Colors = {};
// Colors.names = {
//   blue: '#00334e',
//   red: '#ffb0b0',
//   green: '#5eaaa8',
//   orange: '#ed6663'
// }
// Colors.random = function() {
//     var result;
//     var count = 0;
//     for (var prop in this.names)
//         if (Math.random() < 1/++count)
//            result = prop;
//     return result;
// };

function TileBuilder(props){
  const {presentations} = props;

  return(
    <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4">
      {
        presentations.map((doc) => (
          <div className="col mb-4" key={doc.id}>
            <Card className="bg-default text-white text-center p-3 h-100">
              <CardBody>
                <CardTitle>{doc.data.title}</CardTitle>
                <CardText>
                {doc.data.desc}
              </CardText>
              <CardText>
              <small className="text-muted">{doc.data.updated ? `Updated on ${getDate(doc.data.updated)}` : `Created on ${getDate(doc.data.created)}`}</small>
            </CardText>
          </CardBody>
          </Card>
        </div>
         ))
      }
    </div>
  )
}

export default TileBuilder;
