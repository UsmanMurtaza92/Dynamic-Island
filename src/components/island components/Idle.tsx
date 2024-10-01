import React from "react";
import { motion, Variants } from "framer-motion";

const Idle = () => {
  const popup: Variants = {
    initial: {
      // minHeight: "35px",
      // height: "auto",
      // minWidth: "175px",
      width: "145px",
    },
    animate: {
      // minHeight: "36px",
      width: "110px",
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="bg-black rounded-[32px] mx-auto m-3.5 h-[32px]"
      variants={popup}
      initial="initial"
      animate="animate"
    ></motion.div>
  );
};

export default Idle;
