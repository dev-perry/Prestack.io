import WebViewer from '@pdftron/webviewer';
import React, {useRef, useEffect, useState} from 'react';
import {connect} from "react-redux";


function MediaWindow(props){
  const viewer = useRef(null);
  const {docURL, preview} = props;
  const [docViewer, setInstance] = useState(null);

  useEffect(()=>{
    WebViewer(
      {
        path: '/webviewer/lib',
        preloadWorker: 'pdf',
        disabledElements: [
          'leftPanelButton',
          'viewControlsButton',
          'selectToolButton',
          'freeHandToolGroupButton',
          'searchButton',
          'leftPanel',
          'searchPanel',
          'filePickerButton',
          'annotationPopup',
          'annotationStylePopup',
          'toolStylePopup',
          'stylePopup',
          'textPopup',
          'contextMenuPopup',
          'signatureModal',
          'passwordModal',
          'viewControlsOverlay',
          'menuOverlay',
          'menuButton',
          'freeHandToolGroupButton',
          'searchOverlay',
          'toolsOverlay',
          'pageNavOverlay',
          'toggleNotesButton',
          'toolbarGroup-Annotate',
          'toolbarGroup-Shapes',
          'toolbarGroup-Edit',
          'toolbarGroup-Insert',
          'toolbarGroup-View'
        ]
      },
      viewer.current,
    ).then((instance) => {
      setInstance(instance);
    })
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(docViewer != null && docURL !== ""){
      docViewer.loadDocument(docURL);
    }
    //eslint-disable-next-line
  })

  return(
    <div className="MediaWindow">
      <div className="webviewer" ref={viewer} style={{height: preview ? "75vh" : "100vh"}}></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    docURL: state.drive.currentDocURL
  }
}

export default connect(mapStateToProps)(MediaWindow)
