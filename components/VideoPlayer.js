"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <>
      <div className="hidden md:block">
        <ReactPlayer width={640} controls url={url} />
      </div>
      <div className="md:hidden">
        <ReactPlayer width={320} height={200} controls url={url} />
      </div>
    </>
  );
};

export default VideoPlayer;
