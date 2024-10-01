import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import RingMode from "./island components/RingMode";
import Listening from "./island components/Listening";
import Timer from "./island components/Timer";
import Idle from "./island components/Idle";

const DynamicIsland = () => {
  const [selectedFeature, setSelectedFeature] = useState("Idle");
  const features = ["Idle", "Ring Mode", "Timer", "Listening"];

  const handleFeatures = (name: string) => {
    setSelectedFeature(name);
  };

  return (
    <div className="relative w-[400px] border-8 border-black rounded-[3rem] h-[760px] mx-auto my-6">
      {/* <AnimatePresence initial={false} mode="wait"> */}
      <div>
        {selectedFeature === "Idle" && <Idle />}
        {selectedFeature === "Ring Mode" && <RingMode />}
        {selectedFeature === "Timer" && <Timer />}
        {selectedFeature === "Listening" && <Listening />}
      </div>
      {/* </AnimatePresence> */}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 flex flex-col gap-3 p-6">
        {features.map((name) => (
          <p
            key={name}
            onClick={() => handleFeatures(name)}
            className="min-w-32 bg-gray-300 text-center p-3 rounded-2xl cursor-pointer"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DynamicIsland;
