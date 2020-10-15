import WebViewer from '@pdftron/webviewer';
import React, {useRef, useEffect} from 'react';
import {connect} from "react-redux";


function MediaWindow(props){
  const viewer = useRef(null);
  const {docURL, preview} = props;

  useEffect(()=>{
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: docURL,
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
          'freeHandToolGroupButton',
          'searchOverlay',
          'toolsOverlay',
          'pageNavOverlay'
        ]
      },
      viewer.current,
    ).then((instance) => {
      instance.disableElements(['toolbarGroup-Annotate']);
      instance.disableElements(['toolbarGroup-Shapes']);
      instance.disableElements(['toolbarGroup-Edit']);
      instance.disableElements(['toolbarGroup-Insert']);
    })
    // eslint-disable-next-line
  },[])

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
