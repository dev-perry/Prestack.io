import React, {useState, useEffect} from "react";
import firebase from "../firebase";
import {connect} from "react-redux";
import {
  Button,
  Modal
} from "reactstrap";
import BlockBuilder from "../layouts/BlockBuilder";
import {wordCloud, photoWall} from "../layouts/ParticipationForms"

function Participation(props){
  const [modal, updateModal] = useState({
    open: false,
    content: null
  })
  const [modules, setModules] = useState([]);
  const {user} = props;

  function close(){
    updateModal({open: false, content: null})
  }

  useEffect(()=>{
    var unsubscribe = firebase.firestore().collection("users").doc(user.uid)
    .collection("participation").onSnapshot(function(snapshot){
      var data = [];
      snapshot.forEach(function(doc){
        data.push({id: doc.id, data:doc.data()})
      })
      setModules(data);
    })
    return function cleanup(){
      unsubscribe()
    }
    // eslint-disable-next-line
  },[])

  return(
    <>
    <Modal
    className="modal-dialog"
    isOpen={modal.open}
    backdrop={"static"}
            >
    <div className="modal-header">
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={close}
      >
        <span aria-hidden={true}>×</span>
      </button>
    </div>
    <div className="modal-body">
      {modal.content}
    </div>
      </Modal>
    <div className="d-flex justify-content-between">
      <div className="mt-3 ml-5 d-flex justify-content-start">
        <Button
          className="rounded-lg"
          color="secondary"
          type="button"
          name="cloud"
          onClick={()=>{updateModal({content:wordCloud(close), open:true})}}
          >
          <i className="fas fa-font mx-auto"></i>
          <h4>Word Cloud</h4>
        </Button>
        <Button className="rounded-lg" color="secondary" type="button" name="poll">
          <i className="fas fa-poll mx-auto"></i>
          <h4>Poll</h4>
        </Button>
        <Button
          onClick={()=>{updateModal({content:photoWall(close), open:true})}}
          className="rounded-lg" color="secondary" type="button" name="photo">
          <i className="far fa-images mx-auto"></i>
          <h4>Photo Wall</h4>
        </Button>
        <Button className="rounded-lg" color="secondary" type="button" name="quiz">
          <i className="far fa-check-square"></i>
          <h4>Quiz</h4>
        </Button>
      </div>
    </div>
    <div className="px-3 pt-4">
      {
        modules?
        <BlockBuilder cards={modules}/>:
        null
      }
    </div>
  </>
  )
}

function mapStateToProps(state){
  return{
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Participation);
