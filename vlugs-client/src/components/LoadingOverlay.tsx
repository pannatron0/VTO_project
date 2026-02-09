import { motion, AnimatePresence } from "framer-motion";
import heroWatch from "@/assets/hero-watch.webp";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, hsl(200 80% 95% / 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, hsl(200 80% 95% / 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 70%, hsl(200 80% 95% / 0.5) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 30%, hsl(200 80% 95% / 0.5) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Floating Watch */}
            <motion.div
              className="relative w-48 h-48 mb-10"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={heroWatch}
                alt="Loading"
                className="w-full h-full object-contain watch-shadow opacity-80"
              />
              
              {/* Glow ring around watch */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Loading Spinner */}
            <div className="relative w-16 h-16 mb-8">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-vlugs-platinum"
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-medium text-foreground mb-3"
            >
              AI is generating your try-on...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground"
            >
              This may take a few moments
            </motion.p>

            {/* Animated dots */}
            <div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [-4, 4, -4], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
