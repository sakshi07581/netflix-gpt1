import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="pt-[20%] pl-24 absolute text-white bg-gradient-to-r h-full from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg w-1/3 mt-3">{description}</p>
      <div className="mt-4">
        <button className="p-3 bg-white w-28 text-black  font-bold rounded-md hover:opacity-80">
          ▶️ Play
        </button>
        <button className="ml-2 p-3 bg-gray-300 w-28 text-black  font-bold rounded-md hover:opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
