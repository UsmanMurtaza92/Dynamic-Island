import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Icon } from "@iconify/react";
import musicLogo from "../../assets/images/music-logo.webp";
import { motion, Variants } from "framer-motion";
import AudioWave from "./AudioWave";

const Listening = () => {
  const [isPlay, setIsPlay] = useState(true);

  const popup: Variants = {
    initial: {
      height: "auto",
      width: "320px",
    },
    animate: {
      height: "188px",
      width: "360px",
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="px-4 flex flex-col justify-center text-white bg-black rounded-[32px] mx-auto my-3.5"
      variants={popup}
      initial="initial"
      animate="animate"
    >
      <div className="flex justify-between items-center gap-2 px-1">
        <div className="flex items-center gap-3">
          <img src={musicLogo} alt="" className="w-14 rounded-2xl" />
          <div>
            <p>Timeless Interlude</p>
            <p className="text-sm text-gray-300">Bryson Tiller</p>
          </div>
        </div>
        <AudioWave isPlaying={isPlay} />
      </div>
      <AudioPlayer
        className="mt-3"
        autoPlay
        customVolumeControls={[]}
        customAdditionalControls={[]}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
        onPlay={() => setIsPlay(true)}
        onPause={() => setIsPlay(false)}
        customIcons={{
          play: <Icon icon="raphael:play" className="text-white" />,
          pause: <Icon icon="ic:baseline-pause" className="text-white" />,
        }}
        // other props here
      />
    </motion.div>
  );
};

export default Listening;
