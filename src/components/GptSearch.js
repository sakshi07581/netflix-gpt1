import React from "react";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="h-full bg-black">
      <div className="absolute -z-10"></div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
