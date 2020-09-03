import React, {useMemo, useEffect} from "react";
import {connect} from "react-redux";
import {uploadFile} from "../actions";
import Uppy from "@uppy/core";
import ReduxStore from "@uppy/store-redux";
import store from "../store";
import {DashboardModal} from "@uppy/react";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

function Uploader(props){
  const {upload} = props;
  const uppy = useMemo(()=>{
    return Uppy({
      store: ReduxStore({
        store: store,
        id: 'uploader'
      }),
      restrictions:{
        allowedFileTypes: [
          '.docx',
          '.doc',
          '.pptx',
          '.pdf',
          '.jpeg',
          '.jpg',
          '.png',
          '.mov',
          '.mpg',
          '.mpeg',
          '.mp4'
        ]
      },
      autoProceed: false
    })
  }, [])

  useEffect(()=>{
    return() => uppy.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[uppy])

  uppy.on('complete', (result)=>{
    upload(result.successful);
    uppy.reset();
    // console.log(result.successful);
  })

  return(
    <div>
    <DashboardModal
      uppy={uppy}
      open={props.modal}
      onRequestClose={props.handleClose}
      proudlyDisplayPoweredByUppy={false}
      closeAfterFinish={true}
      showProgressDetails={true}
      trigger=".channel-uploadbtn"
    />
  </div>
  )
}

const mapDispatchToProps = dispatch => {
  return{
    upload: (files) => dispatch(uploadFile(files))
  };
}

export default connect(null, mapDispatchToProps)(Uploader);
