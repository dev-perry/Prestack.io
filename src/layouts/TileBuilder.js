import React, {useState} from "react";
import {connect} from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
}from "reactstrap";

import {setPresentation} from "../actions";
import PresentationEditor from "../components/PresentationEditor";
// import PresentationLauncher from "../components/PresentationLauncher";
import {getDate} from "../firebase/actions";
import NewWindow from "react-new-window";
// import {useLocation} from "react-router-dom";

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

// function useQuery(){
//   return new URLSearchParams(useLocation().search);
// }

function TileBuilder(props){
  const {presentations, setPres} = props;
  const [editModal, toggleEdit] = useState(false);
  // const [launchModal, toggleLaunch] = useState(false);
  const [currentID, setCurrent] = useState(null);
  const [openWindow, open] = useState(false);
  // let query = useQuery();

  return(
    <>
      {/* <PresentationLauncher open={launchModal} toggle={toggleLaunch} presID={currentID}/> */}
      <PresentationEditor open={editModal} toggle={toggleEdit}/>
    <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4 overflow-auto">
      {
        presentations.map((doc, index) => {
        let draft = doc.data.draft;
        return(
              <div className="col mb-4" key={index} presid={doc.id}>
                <Card
                  onClick={(e)=>{
                    if(e.target.className === "card-body"){
                      setPres({
                        id: doc.id,
                        title: doc.data.title,
                        desc: doc.data.desc,
                        sequence: (!doc.data.sequence ? [] : doc.data.sequence)
                      });
                      toggleEdit(true)
                    }
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
                {draft ? null : <Button onClick={()=>{
                  setCurrent(doc.id);
                  open(true);
                  // toggleLaunch(true);
                }}><span><i className="fas fa-play"></i></span></Button>}
              </CardBody>
              </Card>
            </div>
      )
    }
    )
      }
    </div>
    {
      openWindow && <NewWindow url={`/s/player/${currentID}`} title={"Prestack Presentation Player"} center="screen" onUnload={() => open(false)}/>
    }
  </>
  )
}

const mapDispatchToProps = dispatch => {
  return{
    setPres: (pres) => dispatch(setPresentation(pres))
  }
}

export default connect(null, mapDispatchToProps)(TileBuilder);

/* <NavLink style={{fontSize: "1.2rem", color: "white"}} to={`/s/${doc.id}`}><i className="fas fa-play"></i></NavLink> */
