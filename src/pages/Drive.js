import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import firebase from "../firebase";
import classnames from "classnames";

import {setDocumentData} from "../actions";
import GridBuilder from "../layouts/GridBuilder";
import ListBuilder from "../layouts/ListBuilder";
import Uploader from "../components/Uploader";
import emptyDrive from "../graphics/emptyDrive.svg";

import {
  Button,
  ButtonGroup
} from "reactstrap";

function Drive(props){
  const {user, setData, documents} = props;

  const [toggleView, setToggle] = useState({
    grid: 0
  })
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleOpen = () => setModal(true);

  var unsubscribe = firebase.firestore().collection("users").doc(user.uid)
                  .collection("drive").onSnapshot(function(snapshot){
                    var data = [];
                    snapshot.forEach(function(doc){
                      data.push({id: doc.id, data: doc.data()});
                    })
                    setData(data);
                  })

  function renderDocs(layout){
    if(documents){
      switch (layout.grid) {
        case 0:
          return <GridBuilder/>
        case 1:
          return <ListBuilder/>
        default:
          return <img className="w-50 " src={emptyDrive} alt="Empty Drive"/>
      }
    }else{
      return <img className="w-50 " src={emptyDrive} alt="Empty Drive"/>
    }
  }

  useEffect(() => {

    return () => unsubscribe();
  // eslint-disable-next-line
  }, [])

  return (
      <>
        <div className="d-flex justify-content-between">
          <Button onClick={handleOpen} className="mt-3 ml-5 rounded-pill channel-uploadbtn" color="success" type="button">
            <i className="fas fa-plus"></i> Upload Media
          </Button>
          <ButtonGroup className="btn-group-toggle mt-3 mr-4" data-toggle="buttons">
          <Button className={classnames({ active: toggleView.grid === 0 })} color="secondary" onClick={() => setToggle({ grid: 0 })}>
            <input
              autoComplete="off"
              name="gridView"
              type="radio"
              value={toggleView.grid === 0}
            />
            <span><i className="fas fa-th-large pr-2"></i>Grid</span>
          </Button>
          <Button className={classnames({ active: toggleView.grid === 1 })} color="secondary" onClick={() => setToggle({ grid: 1 })}>
            <input
              autoComplete="off"
              name="listView"
              type="radio"
              value={toggleView.grid === 1}
            />
            <span><i className="fas fa-list pr-2"></i>List</span>
          </Button>
        </ButtonGroup>
        </div>
        <div className="px-3 pt-4 overflow-auto">
          {renderDocs(toggleView)}
          <Uploader modal={modal} handleClose={handleClose}/>
        </div>
      </>
    );
  }

  function mapStateToProps(state){
    return{
      user: state.auth.user,
      documents: state.drive.documents
    };
  }

  const mapDispatchToProps = dispatch => {
    return{
      setData: (docs) => dispatch(setDocumentData(docs)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Drive);
