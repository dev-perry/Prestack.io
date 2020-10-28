import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {connect} from "react-redux";
import firebase from "../firebase";
import {sendCurrent} from "../firebase/actions";
import {useLocation} from "react-router-dom";

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function ParticipationView(props){
  const {assetID, user} = props;
  const [view, setView] = useState(null);
  const db = firebase.firestore();
  let query = useQuery();

  function signalHandler(){
    if(query.get("view") === "true"){
      sendCurrent({refPath: view.ref.path, classID: query.get("class")})
      // console.log({refPath: view.ref.path, idList: idArray});
    }
  }

  useEffect(() => {
    //Get participation Data
    db.collection("users").doc(user.uid).collection("participation").doc(assetID)
    .get().then(function(doc) {
      setView(doc.data())
    }).catch(function(error) {
      console.log("Error getting document ", error);
    })

    return () => setView(null);
    //eslint-disable-next-line
    }, [])

    return(
      <div className="vh-100 vw-100 text-center pt-6">
        <Button className = "rounded-circle" onClick={signalHandler}><span><i class="fas fa-play"></i></span></Button>
        {
          view != null
          ? <div className="mx-auto mt-3">
            <h2>{view.title}</h2>
            <p>{view.prompt}</p>
          </div>
          : <div className="my-auto">Loading participation</div>
        }
      </div>
    )
  }

  function mapStateToProps(state){
    return{
      user: state.auth.user,
      presentation: state.presentations.currentPres
    }
  }

  export default connect(mapStateToProps)(ParticipationView);
