import WebViewer from '@pdftron/webviewer';
import React, {useRef, useEffect} from 'react';
import {connect} from "react-redux";


function MediaWindow(props){
  const viewer = useRef(null);
  const {docURL} = props;

  useEffect(()=>{
    WebViewer(
      {
        path: '/public/webviewer',
        initialDoc: docURL
      },
      viewer.current,
    ).then((instance) => {
      const {docViewer} = instance;
      //call WebViewer APIs
    })
  },[])

  return(
    <div className="MediaWindow">
      <div className="webviewer" ref={viewer} style={{height: "75vh"}}></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    docURL: state.drive.currentDocURL
  }
}

export default connect(mapStateToProps)(MediaWindow)
