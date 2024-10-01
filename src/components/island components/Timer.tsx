import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useTimer } from "react-timer-hook";
import { motion, Variants } from "framer-motion";

const Timer = () => {
  const [isPlay, setIsPlay] = useState(true);

  const popup: Variants = {
    initial: {
      height: "auto",
      width: "280px",
    },
    animate: {
      height: "64px",
      width: "300px",
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  // Set-up timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const { seconds, minutes, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => restart,
  });

  const handleTimer = () => {
    isPlay ? pause() : resume();
    setIsPlay((prev) => !prev);
  };

  return (
    <motion.div
      className="text-white bg-black rounded-[32px] mx-auto my-3.5"
      variants={popup}
      initial="initial"
      animate="animate"
    >
      <div className="px-4 flex justify-between items-center gap-4 h-full">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-golden-700">
            <Icon
              icon={isPlay ? "ic:baseline-pause" : "ph:play-fill"}
              onClick={handleTimer}
              className="text-golden-500 text-xl"
            />
          </div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#3C3D3C]">
            <Icon icon="ic:outline-close" className="text-white text-xl" />
          </div>
        </div>

        <div className="flex items-end gap-2 text-golden-500">
          <p className="text-sm pb-1">Timer</p>
          <p className="flex items-center gap-1 flex-nowrap w-[90px] text-3xl text-golden-500">
            <span>
              {minutes < 10 && 0}
              {minutes}
            </span>
            :
            <span>
              {seconds < 10 && 0}
              {seconds}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;
