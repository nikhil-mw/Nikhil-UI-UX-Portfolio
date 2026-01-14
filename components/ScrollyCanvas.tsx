"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll progress from 0 to 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Load images on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetch("/frames.json");
        if (!res.ok) throw new Error("Failed to load frames manifest");
        const fileNames = await res.json() as string[];
        
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (const fileName of fileNames) {
            const img = new Image();
            img.src = "/sequence/" + fileName;
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
            });
            loadedImages.push(img);
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / fileNames.length) * 100));
        }
        setImages(loadedImages);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading sequence:", error);
      }
    };

    loadImages();
  }, []);

  // Draw to canvas
  const render = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[index]) return;

    // Responsive Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = images[index];
    
    // Calculate aspect ratios for object-fit: cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    
    render(0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        images.length - 1,
        Math.floor(latest * images.length)
      );
      requestAnimationFrame(() => render(frameIndex));
    });

    const handleResize = () => {
       const currentProgress = scrollYProgress.get();
       const frameIndex = Math.min(
        images.length - 1,
        Math.floor(currentProgress * images.length)
      );
      render(frameIndex);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress, isLoaded, images]);

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />
        <Overlay scrollYProgress={scrollYProgress} />
        
        <AnimatePresence mode="wait">
            {!isLoaded && (
                <motion.div
                    key="loader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
                >
                   <div className="w-full max-w-md px-6 flex flex-col gap-2">
                        {/* Header Details */}
                        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans">
                            <span>Portfolio 2026</span>
                            <span>Initialization</span>
                        </div>

                        {/* Large Counter */}
                        <div className="text-8xl md:text-9xl font-black font-sans tracking-tighter leading-none mb-4 tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                            {loadProgress}%
                        </div>

                        {/* Progress Line */}
                        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                            />
                        </div>

                        {/* Footer Details */}
                        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans mt-2">
                            <span>Loading High-Res Sequence</span>
                            <span className="animate-pulse">Stand By</span>
                        </div>
                   </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Overlay Component for Parallax Text
function Overlay({ scrollYProgress }: { scrollYProgress: import("framer-motion").MotionValue<number> }) {
  // Map scroll progress to opacity/translate logic
  const y1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, -50, -100]);
  const o1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [100, 0, -100]);
  const o2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);

  const y3 = useTransform(scrollYProgress, [0.45, 0.75, 1], [100, 0, -50]);
  const o3 = useTransform(scrollYProgress, [0.5, 0.75, 0.95], [0, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
      
      {/* Section 1 - Intro (Modern UI Badge Style) */}
      <motion.div 
        style={{ y: y1, opacity: o1 }} 
        className="absolute w-full h-full flex flex-col items-end justify-center px-6 md:px-20"
      >
        <div className="flex flex-col items-end">
          
          {/* Role as a UI Component (Pill) */}
          <div className="mb-6 px-4 py-2 border border-[#1a1a1a]/30 rounded-full bg-white/5 backdrop-blur-sm">
            <p className="font-sans text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-[#1a1a1a]">
              ● UI/UX Designer
            </p>
          </div>

          {/* Name Block */}
          <div className="text-right relative uppercase text-[#0a0a0a]">
            <h1 className="font-sans text-7xl md:text-9xl font-medium tracking-tighter leading-[0.9]">
              <span className="block">Nikhil . M.</span>
              <span className="block">Wakchaure</span>
            </h1>
          </div>

          {/* Decorative Elements */}
          <div className="flex items-center gap-4 mt-8 opacity-60">
             <span className="h-[1px] w-12 bg-black"></span>
             <span className="font-sans text-sm font-medium tracking-widest text-black">PUNE / MAHARASHTRA / INDIA</span>
          </div>

        </div>
      </motion.div>

      {/* Section 2 - Craft (RIGHT SIDE) */}
      <motion.div 
        style={{ y: y2, opacity: o2 }} 
        className="absolute w-full h-full flex flex-col items-end justify-center px-6 md:px-20"
      >
        <div className="relative text-right mix-blend-overlay text-[#0a0a0a]">
           <h2 className="font-sans text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] uppercase">
            <span className="block">Crafting Digital</span>
             <span className="block">Masterpieces.</span>
           </h2>
        </div>
      </motion.div>

      {/* Section 3 - Innovation (BOTTOM LEFT) */}
      <motion.div 
        style={{ y: y3, opacity: o3 }} 
        className="absolute w-full h-full flex flex-col justify-end pb-[15%] md:pb-[10%] px-8 md:px-24"
      >
        <div className="text-left mix-blend-overlay text-[#0a0a0a]">
          <h2 className="font-sans text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] uppercase">
            Merging Art <br /> 
            & Innovation.
          </h2>
        </div>
      </motion.div>

    </div>
  );
}
