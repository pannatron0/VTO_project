import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";

interface UploadCardProps {
  label: string;
  description: string;
  image: string | null;
  onImageUpload: (image: string) => void;
  onImageRemove: () => void;
}

export const UploadCard = ({
  label,
  description,
  image,
  onImageUpload,
  onImageRemove,
}: UploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageUpload(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-premium rounded-3xl p-6 md:p-8"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {image && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-green-600" />
            </motion.div>
          )}
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {image ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-vlugs-pearl"
          >
            <img
              src={image}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
            />
            
            {/* Remove Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onImageRemove}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            {/* Floating Effect Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        ) : (
          <motion.label
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              upload-premium aspect-square flex flex-col items-center justify-center cursor-pointer
              ${isDragging ? "active" : ""}
            `}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <motion.div
              animate={isDragging ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-vlugs-silver flex items-center justify-center mb-5"
                whileHover={{ scale: 1.05 }}
              >
                {isDragging ? (
                  <ImageIcon className="w-7 h-7 text-accent" />
                ) : (
                  <Upload className="w-7 h-7 text-muted-foreground" />
                )}
              </motion.div>
              
              <p className="text-sm font-medium text-foreground mb-1">
                {isDragging ? "Drop to upload" : "Drop image here"}
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
            </motion.div>
          </motion.label>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
