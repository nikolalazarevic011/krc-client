import React from 'react'
import ReactPlayer from "react-player";
//test
const VideoPlayer = ({ url }) => {
    return (
        <ReactPlayer
            controls={true}
            url={url}
            width="100%"
            height="300px"
            muted={true}
            playing={false}
            loop={true}
        />
    );
};

export default VideoPlayer;
