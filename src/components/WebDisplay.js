import React from "react";
import Iframe from "react-iframe";

function WebDisplay({url}){
  return(
    <Iframe
      url={url}
      width="100%"
      height="100%"
    />
  )
}

export default WebDisplay;
