import React from "react";
import { motion } from "framer-motion";

type Props = {
  isPlaying: boolean;
};

const AudioWave = ({ isPlaying }: Props) => {
  return isPlaying ? (
    <div className="h-5 flex items-center gap-1">
      <motion.div
        className="w-0.5 bg-blue-600"
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.8, delay: 0.05, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="w-0.5 bg-blue-600"
        initial={{ height: "10%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.8, delay: 0.25, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="w-0.5 bg-blue-600"
        initial={{ height: "3%" }}
        animate={{ height: "60%" }}
        transition={{ duration: 0.8, delay: 0.15, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="w-0.5 bg-blue-600"
        initial={{ height: "20%" }}
        animate={{ height: "60%" }}
        transition={{ duration: 0.8, delay: 0.05, repeat: Infinity }}
      ></motion.div>
    </div>
  ) : (
    <div className="flex items-center gap-1 text-blue-600">
      <span>.</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};

export default AudioWave;
