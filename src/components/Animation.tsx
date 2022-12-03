import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  style?: React.CSSProperties;
  loop?: boolean;
  uri: string;
}

const Animation = ({ style, loop, uri }: Props) => {
  return (
    <Player
      autoplay
      loop={loop}
      src={uri}
      style={style}
    />
  );
};

Animation.defaultProps = {
  style: {
    height: "300px",
    width: "300px",
  },
  loop: true,
};

export default Animation;
