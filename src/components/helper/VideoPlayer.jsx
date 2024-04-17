import React from 'react'
import ReactPlayer from "react-player";
const VideoPlayer = ({ url, detailComp }) => {
    return (
        <ReactPlayer
            controls={true}
            url={url}
            width="100%"
            height={detailComp ? "570px" : "300px"}
            muted={true}
            playing={false}
            loop={true}
        />
    );
};

export default VideoPlayer;
