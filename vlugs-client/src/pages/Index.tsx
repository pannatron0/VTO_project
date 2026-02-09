import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { VlugsHeader } from "@/components/VlugsHeader";
import { HeroFloatingWatch } from "@/components/HeroFloatingWatch";
import { UploadCard } from "@/components/UploadCard";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ResultModal } from "@/components/ResultModal";
import { useHistory } from "@/hooks/useHistory";
import { useToast } from "@/hooks/use-toast";
import { callGenerateAPI } from "@/lib/api";
import heroWatch from "@/assets/hero-watch.webp";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput"; // เพิ่มบรรทัดนี้

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToHistory } = useHistory();
  const [searchQuery, setSearchQuery] = useState(""); // เพิ่มบรรทัดนี้
  

  const canGenerate = !!baseImage;

  // เพิ่มฟังก์ชันนี้
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", e.target.value);
    // ใส่ logic การค้นหาของคุณที่นี่
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsLoading(true);

    try {
      // Call the actual API (strap may be optional)
      const resultUrl = await callGenerateAPI(baseImage as string, styleImage ?? undefined);
      
      setResultImage(resultUrl);
      setShowModal(true);
      
      toast({
        title: "Success!",
        description: "Your try-on image has been generated.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToHistory = () => {
    if (resultImage && baseImage) {
      addToHistory({
        resultImage,
        baseImage,
        styleImage,
      });
    }
  };

  const handleNavigateToResult = () => {
    navigate("/result", { state: { resultImage, baseImage, styleImage } });
  };

  return (
    <div className="min-h-screen bg-background">
      <VlugsHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 hero-gradient overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-vlugs-sky/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
              >
                Virtual Try-On Experience
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-gradient leading-tight mb-6"
              >
                Discover Your
                <br />
                Perfect Style
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8"
              >
                Experience the future of personalization. Upload your images and let AI create your perfect custom watch configuration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a
                  href="#try-on"
                  className="inline-flex items-center gap-2 px-8 py-4 btn-premium text-white rounded-full font-thin"
                >
                  Start Try-On
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Watch */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <HeroFloatingWatch />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Try-On Section */}
      <section id="try-on" className="py-20 lg:py-32 bg-vlugs-pearl">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-gradient mb-4">
              Create Your Configuration
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your base watch and the style you want to apply. Our AI will generate your perfect try-on.
            </p>

          </motion.div>

          {/* Upload Cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-12">
            <UploadCard
              label="Base Object"
              description="Upload your watch case or wrist image"
              image={baseImage}
              onImageUpload={setBaseImage}
              onImageRemove={() => setBaseImage(null)}
            />
            <UploadCard
              label="Style Element"
              description="Upload the strap or style you want to apply"
              image={styleImage}
              onImageUpload={setStyleImage}
              onImageRemove={() => setStyleImage(null)}
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
              <Button disabled={!canGenerate} onClick={handleGenerate}>
              Generate
              </Button>
          </div>

          {/* Status Hint */}
          {!canGenerate && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground mt-6"
            >
              {!baseImage
                ? "Upload a base object image to get started"
                : "You can optionally upload a style element (strap) — otherwise the original strap will be kept."}
            </motion.p>
          )}
        </div>
      </section>

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} />

      {/* Result Modal */}
      <ResultModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        resultImage={resultImage || ""}
        onSaveToHistory={handleSaveToHistory}
        onNavigateToResult={handleNavigateToResult}
      />
    </div>
  );
};

export default Index;
