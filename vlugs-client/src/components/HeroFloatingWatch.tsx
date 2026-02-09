import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import defaultWatch from "@/assets/hero-watch.webp";

// Dynamically import all watches from the watch directory
const watchModules = import.meta.glob("/src/assets/watch/*", { eager: true });
const availableWatches = Object.values(watchModules).map(
  (module: any) => module.default
);

export const HeroFloatingWatch = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedWatch, setSelectedWatch] = useState<string>(defaultWatch);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Select a random watch on mount
  useEffect(() => {
    if (availableWatches.length > 0) {
      const randomWatch =
        availableWatches[Math.floor(Math.random() * availableWatches.length)];
      setSelectedWatch(randomWatch);
    }
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md lg:max-w-lg mx-auto">
      {/* Glow Effect Behind Watch */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-radial from-vlugs-sky/40 via-vlugs-ice/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Floating Watch */}
      <motion.div
        style={{ y, rotate, scale }}
        className="relative flex items-center justify-center"
      >
        <motion.img
          src={selectedWatch}
          alt="VLUGS Premium Watch"
          className="w-full h-auto max-h-[500px] max-w-[500px] watch-shadow object-contain rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />

        {/* Continuous Float Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={selectedWatch}
            alt=""
            className="w-full h-auto max-h-[500px] max-w-[500px] opacity-0 object-contain"
            aria-hidden="true"
          />
        </motion.div>

        {/* Light Reflection Effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Shadow beneath watch */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8"
        style={{ y }}
      >
        <motion.div
          className="w-full h-full bg-vlugs-deep/10 rounded-full blur-2xl"
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};
