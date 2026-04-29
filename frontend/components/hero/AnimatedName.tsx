"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedName() {
  const name = "Mahab Rizwan";
  const letters = name.split("");
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = ["text-blue-500", "text-cyan-400"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
    hover: {
      scale: 1.2,
      y: -10,
      rotateY: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.h1
      className="font-bold text-6xl md:text-7xl lg:text-9xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          whileHover="hover"
          className={`inline-block ${colors[index % 2]}`}
          style={{
            perspective: "1000px",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
