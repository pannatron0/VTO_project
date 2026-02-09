import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export interface HistoryItem {
  id: string;
  resultImage: string;
  baseImage: string;
  styleImage: string;
  timestamp: number;
}

interface HistoryCardProps {
  item: HistoryItem;
  onClick: () => void;
  index: number;
}

export const HistoryCard = ({ item, onClick, index }: HistoryCardProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-premium rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-vlugs-ice to-vlugs-pearl">
        <motion.img
          src={item.resultImage}
          alt="Try-on result"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating animation on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{formatDate(item.timestamp)}</span>
        </div>
      </div>
    </motion.div>
  );
};
