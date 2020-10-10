import React from "react";
import YouTube from "react-youtube";

function YoutubePlayer(props){
  const {videoSource} = props;
  const assetID = videoSource.split('/')

  const opts={
    playerVars: {
      modestbranding: 1,
      fs: 0,
      controls: 0
    }
  }

  return(
    <div>
      <YouTube
        videoId={assetID[3]}
        className="vw-100 vh-100"
        opts={opts}
      />
    </div>
  )
}

export default YoutubePlayer;
