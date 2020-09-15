import React, {useState, useEffect} from "react";
import firebase from "../firebase";
//reactstrap componenets
import {Button} from "reactstrap";
import {connect} from "react-redux";
import noPresentations from "../graphics/noPresentations.svg";
import PresentationCreator from "../components/PresentationCreator";
import TileBuilder from "../layouts/TileBuilder";

function Presentations(props){
  const [modal, toggleModal] = useState(false);
  const [presentations, setPres] = useState([]);
  const {user} = props;


  useEffect(()=>{
    var unsubscribe = firebase.firestore().collection("users").doc(user.uid)
                      .collection("presentations").onSnapshot(function(snapshot){
                        var data = [];
                        snapshot.forEach(function(pres){
                          data.push({id: pres.id, data:pres.data()})
                        })
                        setPres(data);
                      })

    return function cleanup(){
      unsubscribe();
    }
    // eslint-disable-next-line
  }, [])

    return(
      <>
      <div className="d-flex justify-content-between">
        <Button
          className="mt-3 ml-5 rounded-pill channel-uploadbtn"
          color="primary"
          type="button"
          onClick={() => toggleModal(!modal)}
          >
          <i className="fas fa-plus"></i> New Presentation
        </Button>
      </div>
      <div className="px-3 pt-4">
        <PresentationCreator open={modal} toggle={toggleModal}/>
        {
          Array.isArray(presentations) || presentations.length ?
          <TileBuilder presentations={presentations}/> :
          <img src={noPresentations} alt="No Presentations"/>
        }
      </div>
    </>
    )
}

function mapStateToProps(state){
  return{
    user: state.auth.user
  };
}

// const mapDispatchToProps = dispatch => {
//   return{
//     setPresentations: (pres) => dispatch(setPresData(pres)),
//   }
// }

export default connect(mapStateToProps)(Presentations);
