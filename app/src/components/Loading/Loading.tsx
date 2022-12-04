import React from "react";
import Animation from "../Animation/Animation";

const Loading = () => {
  return (
    <Animation
      src={require("../../assets/animations/loading.json")}
      style={{
        width: 50,
        height: 50,
      }}
    />
  );
};

export default Loading;
