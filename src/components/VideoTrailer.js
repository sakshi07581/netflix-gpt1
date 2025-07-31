// VideoTrailer.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const VideoTrailer = () => {
  const location = useLocation();
  const { videoUrl } = location.state || {};

  if (!videoUrl) {
    return (
      <div className="text-center p-4 text-red-500">
        No video available or invalid video URL.
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <iframe
        className="w-full aspect-video"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoTrailer;