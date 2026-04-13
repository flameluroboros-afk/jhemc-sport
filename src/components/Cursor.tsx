"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (tag: string) => {
        const elements = document.querySelectorAll(tag);
        elements.forEach(el => {
            el.addEventListener("mouseenter", () => setIsHovering(true));
            el.addEventListener("mouseleave", () => setIsHovering(false));
        });
    }

    window.addEventListener("mousemove", mouseMove);
    handleHover("button");
    handleHover("a");

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      transition: { type: "spring", damping: 20, stiffness: 200, mass: 0.5 }
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "#ccff00",
      mixBlendMode: "difference" as any,
      transition: { type: "spring", damping: 20, stiffness: 200, mass: 0.5 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-brand-neon z-[9999] pointer-events-none hidden lg:block"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
    />
  );
}
