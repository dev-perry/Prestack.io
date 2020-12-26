import React, {useState, useEffect} from "react";
import firebase from "../firebase";
import {connect} from "react-redux";
import {
  Button,
  Modal
} from "reactstrap";
import BlockBuilder from "../layouts/BlockBuilder";
import {wordCloud, polling, Quiz} from "../layouts/ParticipationForms"

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
          <span style={{color: "#21209c"}}><i className="fas fa-font mx-auto"></i></span>
          <h4>Word Cloud</h4>
        </Button>
        <Button
          className="rounded-lg"
          color="secondary"
          type="button"
          name="poll"
          onClick={()=>{updateModal({content:polling(close), open:true})}}
          >
          <span style={{color:"#fdb827"}} >
            <i className="fas fa-poll mx-auto"></i>
          </span>
          <h4>Poll</h4>
        </Button>
        <Button
          className="rounded-lg"
          color="secondary"
          type="button"
          name="quiz"
          onClick={()=>{updateModal({content:<Quiz close={close}/>, open:true})}}
          >
          <span style={{color: "#6f9eaf"}}>
            <i className="far fa-check-square"></i>
          </span>
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
