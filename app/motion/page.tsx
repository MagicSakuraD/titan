"use client";
import React from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const MotionPage = () => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  return (
    <div>
      <motion.div layout />
      <motion.div
        className="w-12 h-12 bg-rose-400"
        id="box"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
      />

      <motion.div
        drag="x"
        style={{ x, opacity }}
        className="w-12 h-12 bg-indigo-600"
      />

      <div onClick={() => animate(".boxes", { opacity: 0 })} />
    </div>
  );
};

export default MotionPage;
