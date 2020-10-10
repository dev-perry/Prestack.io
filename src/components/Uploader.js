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
    return new Uppy({
      store: ReduxStore({
        store: store,
        id: 'uploader'
      }),
      restrictions:{
        allowedFileTypes: [
          '.docx',
          '.doc',
          '.ppt',
          '.pptx',
          '.pdf',
          '.jpeg',
          '.jpg',
          '.png'        ]
      },
      logger: Uppy.debugLogger,
      allowMultipleUploads: false
    })
    .on('upload-success', (file, response)=>{
      // upload(result.successful);
      // uppy.reset();
      console.log(file.name, response.upload);
    })
    .on('complete', (result) => {
      upload(result.successful)
      uppy.reset();
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    return() => uppy.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div>
    <DashboardModal
      uppy={uppy}
      open={props.modal}
      onRequestClose={props.handleClose}
      proudlyDisplayPoweredByUppy={false}
      closeAfterFinish={true}
      closeModalOnClickOutside
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
