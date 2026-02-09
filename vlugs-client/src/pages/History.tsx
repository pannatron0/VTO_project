import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { History as HistoryIcon, Trash2, Watch } from "lucide-react";
import { VlugsHeader } from "@/components/VlugsHeader";
import { HistoryCard, HistoryItem } from "@/components/HistoryCard";
import { ResultModal } from "@/components/ResultModal";
import { useHistory } from "@/hooks/useHistory";

const History = () => {
  const navigate = useNavigate();
  const { history, clearHistory } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const handleCardClick = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  const handleNavigateToResult = () => {
    if (selectedItem) {
      navigate("/result", { state: { resultImage: selectedItem.resultImage } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VlugsHeader />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HistoryIcon className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-semibold text-gradient">
                  History
                </h1>
              </div>
              <p className="text-muted-foreground">
                Your previous VLUGS configurations
              </p>
            </div>

            {history.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearHistory}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </motion.button>
            )}
          </motion.div>

          {/* Content */}
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-premium rounded-3xl p-16 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-vlugs-silver flex items-center justify-center mx-auto mb-8">
                <Watch className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-3">
                No History Yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Your generated configurations will appear here. Start by creating your first VLUGS try-on.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-8 py-4 btn-premium text-primary-foreground rounded-full font-medium"
              >
                Create Your First Try-On
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {history.map((item, index) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Result Modal */}
      {selectedItem && (
        <ResultModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          resultImage={selectedItem.resultImage}
          onSaveToHistory={() => {}}
          onNavigateToResult={handleNavigateToResult}
        />
      )}
    </div>
  );
};

export default History;
