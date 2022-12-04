import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  src: any;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const Animation = (props: Props) => {
  return <Player {...props} />;
};

Animation.defaultProps = {
  loop: true,
  autoplay: true,
  style: {
    height: 300,
    width: 300,
  },
};

export default Animation;
