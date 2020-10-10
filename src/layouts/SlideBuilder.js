import React from "react";
import {connect} from "react-redux";
import MediaWindow from "../components/MediaWindow";
import WebDisplay from "../components/WebDisplay";
import YoutubePlayer from "../components/YoutubePlayer";
import {loadFile} from "../actions/index";

function SlideBuilder(props){
  const {module, getFile} = props

  function construction(module){
    switch (module.build.type) {
      case "drive":
        getFile(module.file);
        return <div className="vw-100 vh-100"><MediaWindow/></div>
      case "internet":
        return <WebDisplay url={module.link}/>
      case "youtube":
        return <YoutubePlayer videoSource={module.videolink}/>
      default:
        return <div className="m-auto">No module loaded</div>;
    }
  }

  return <>
  {
    construction(module)
  }
</>
}

const mapDispatchToProps = dispatch => {
  return{
    getFile: (name) => dispatch(loadFile(name))
  }
}

export default connect(null, mapDispatchToProps)(SlideBuilder);
