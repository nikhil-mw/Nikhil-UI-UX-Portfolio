"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

        for (const fileName of fileNames) {
            const img = new Image();
            img.src = "/sequence/" + fileName;
            await new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
            });
            loadedImages.push(img);
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
        {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground z-50">
                <span className="animate-pulse">Loading Experience...</span>
            </div>
        )}
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

  const y3 = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [100, 0, -100]);
  const o3 = useTransform(scrollYProgress, [0.40, 0.6, 0.75], [0, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
      
      {/* Section 1 - Intro */}
      <motion.div 
        style={{ y: y1, opacity: o1 }} 
        className="absolute w-full h-full flex flex-col items-center justify-center p-8"
      >
         <div className="relative text-center mix-blend-overlay">
          <p className="font-sans text-sm md:text-xl font-medium tracking-[0.6em] uppercase text-[#1a1a1a] mb-4 md:mb-8">
            UI · UX Designer
          </p>
          <h1 className="font-sans text-7xl md:text-9xl font-light tracking-tighter text-[#0a0a0a] leading-[0.9]">
            Nikhil M
            <span className="block font-medium">Wakchaure</span>
          </h1>
        </div>
      </motion.div>

      {/* Section 2 - Craft */}
      <motion.div 
        style={{ y: y2, opacity: o2 }} 
        className="absolute w-full h-full flex flex-col justify-end pb-[15%] md:pb-[10%] px-8 md:px-24"
      >
        <h2 className="font-sans text-5xl md:text-8xl font-light tracking-tight text-white mix-blend-difference leading-none">
          Crafting digital <br /> 
          <span className="font-semibold italic">Masterpieces.</span>
        </h2>
      </motion.div>

      {/* Section 3 - Innovation */}
      <motion.div 
        style={{ y: y3, opacity: o3 }} 
        className="absolute w-full h-full flex flex-col justify-start pt-[15%] md:pt-[20%] items-end px-8 md:px-24"
      >
        <h2 className="font-sans text-5xl md:text-8xl font-light tracking-tight text-white mix-blend-difference text-right leading-none">
          Merging Art <br /> 
          <span className="font-normal">& Innovation.</span>
        </h2>
      </motion.div>

    </div>
  );
}
