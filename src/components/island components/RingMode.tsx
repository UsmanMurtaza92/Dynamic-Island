import React from "react";
import { Icon } from "@iconify/react";
import { motion, Variants } from "framer-motion";

const RingMode = () => {
  const popup: Variants = {
    initial: {
      width: "110px",
    },
    animate: {
      width: "145px",
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="text-white bg-black rounded-[32px] mx-auto my-3.5 h-[32px] "
      variants={popup}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between gap-4 h-full px-4">
        <Icon icon="line-md:bell-filled-loop" className="text-lg" />
        <p className="text-[15px]">Ring</p>
      </div>
    </motion.div>
  );
};

export default RingMode;
