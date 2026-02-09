import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, Save, ExternalLink } from "lucide-react";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultImage: string;
  onSaveToHistory: () => void;
  onNavigateToResult: () => void;
}

export const ResultModal = ({
  isOpen,
  onClose,
  resultImage,
  onSaveToHistory,
  onNavigateToResult,
}: ResultModalProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `vlugs-tryon-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My VLUGS Try-On",
          text: "Check out my custom watch configuration!",
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleViewResult = () => {
    onSaveToHistory();
    onNavigateToResult();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-vlugs-deep/20 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative glass-premium rounded-3xl p-8 max-w-lg w-full"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-vlugs-silver flex items-center justify-center hover:bg-vlugs-platinum transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                Your Try-On is Ready
              </h2>
              <p className="text-sm text-muted-foreground">
                Your custom VLUGS configuration
              </p>
            </div>

            {/* Result Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden mb-8 bg-gradient-to-b from-vlugs-ice to-vlugs-pearl"
            >
              <motion.img
                src={resultImage}
                alt="Try-on result"
                className="w-full h-full object-cover"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl btn-premium text-primary-foreground font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-vlugs-silver text-foreground font-medium hover:bg-vlugs-platinum transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSaveToHistory();
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-vlugs-silver text-foreground font-medium hover:bg-vlugs-platinum transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewResult}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Full</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
