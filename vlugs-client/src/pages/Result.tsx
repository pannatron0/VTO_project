import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2, ArrowLeftRight } from "lucide-react";
import { VlugsHeader } from "@/components/VlugsHeader";
import heroWatch from "@/assets/hero-watch.webp";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultImage = location.state?.resultImage || heroWatch;
  const [showComparison, setShowComparison] = useState(false);

  // Use user-uploaded base image when available, otherwise fall back to heroWatch
  const beforeImage = location.state?.baseImage || heroWatch;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `vlugs-result-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My VLUGS Configuration",
          text: "Check out my custom VLUGS watch!",
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VlugsHeader />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-vlugs-silver transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Create
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-gradient mb-3">
              Your VLUGS Configuration
            </h1>
            <p className="text-muted-foreground">
              AI-generated custom watch visualization
            </p>
          </motion.div>

          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-premium rounded-3xl p-8 md:p-12 mb-8"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-vlugs-sky/40 via-transparent to-transparent blur-2xl animate-pulse-soft" />
              </div>

              {/* Floating Watch */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={resultImage}
                  alt="Your VLUGS Configuration"
                  className="w-full h-auto watch-shadow rounded-2xl"
                />
              </motion.div>

              {/* Shadow */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-vlugs-deep/10 rounded-full blur-xl"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-4 rounded-full btn-premium text-primary-foreground font-medium"
            >
              <Download className="w-5 h-5" />
              Download
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-vlugs-silver text-foreground font-medium hover:bg-vlugs-platinum transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              <ArrowLeftRight className="w-5 h-5" />
              {showComparison ? "Hide Compare" : "Compare"}
            </motion.button>
          </motion.div>

          {/* Before/After Comparison */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-premium rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-xl font-display font-semibold text-foreground mb-8 text-center">
                Before / After Comparison
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-vlugs-ice to-vlugs-pearl mb-4">
                    <motion.img
                      src={beforeImage}
                      alt="Before"
                      className="w-full h-full object-contain p-4"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Original
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-vlugs-ice to-vlugs-pearl mb-4">
                    <motion.img
                      src={resultImage}
                      alt="After"
                      className="w-full h-full object-contain p-4"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Try-On Result
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Result;
