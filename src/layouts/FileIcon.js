import React from "react";
import {
  CardImg
} from "reactstrap";

function FileIcon(props){
  const {assetType, thumb} = props;

  function iconReader(type){
    switch (type) {
      case "docx":
      case "doc":
        return  <span style={{color: "blue"}}><i className="far fa-file-word"></i></span>
      case "ppt":
      case "pptx":
        return <span style={{color: "orange"}}><i className="far fa-file-powerpoint"></i></span>
      case "pdf":
        return <span style={{color: "red"}}><i className="far fa-file-pdf"></i></span>
      case "jpg":
      case "jpeg":
        return <span style={{color: "green"}}><i class="far fa-images"></i></span>
      default:
        return null
    }
  }

  function thumbReader(type){
    switch (type) {
      case "docx":
      case "doc":
        return <CardImg alt="File thumbnail" src={require("../graphics/Word-Thumb.jpg")} top />
      case "ppt":
      case "pptx":
        return <CardImg alt="File thumbnail" src={require("../graphics/PP-Thumb.jpg")} top />
      case "pdf":
        return <CardImg alt="File thumbnail" src={require("../graphics/PDF-Thumb.jpg")} top />
      case "jpg":
      case "jpeg":
        return <CardImg alt="File thumbnail" src={require("../graphics/Images-Thumb.jpg")} top />
      default:
        return null
    }
  }

  return(
    <>
      {thumb ? thumbReader(assetType) : iconReader(assetType)}
    </>
  )
}

export default FileIcon;
