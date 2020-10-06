import React, {useState} from "react";
import {connect} from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardText
}from "reactstrap";

import noPresentations from "../graphics/noPresentations.svg";
import {setPresentation} from "../actions";
import PresentationEditor from "../components/PresentationEditor";
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
  const {presentations, setPres} = props;
  const [modal, toggleModal] = useState(false);

  return(
    <>
      <PresentationEditor open={modal} toggle={toggleModal}/>
    <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4 overflow-auto">
      {
        presentations.length ?
        presentations.map((doc) => (
          <div className="col mb-4" key={doc.id}>
            <Card
              onClick={()=>{
                setPres({
                  id: doc.id,
                  title: doc.data.title,
                  desc: doc.data.desc,
                  sequence: (!doc.data.sequence ? [] : doc.data.sequence)
                });
                toggleModal(true)
              }}
              className="bg-default text-white text-center p-3 h-100"
              >
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
      )):
      <img src={noPresentations} alt="No Presentations"/>
      }
    </div>
  </>
  )
}

const mapDispatchToProps = dispatch => {
  return{
    setPres: (pres) => dispatch(setPresentation(pres))
  }
}

export default connect(null, mapDispatchToProps)(TileBuilder);
