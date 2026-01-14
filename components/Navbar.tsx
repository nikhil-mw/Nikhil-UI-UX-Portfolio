"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Visuals", href: "#visuals" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Reveal navbar after scrolling past the main hero section (roughly 3.5-4 viewport heights)
    const triggerPoint = typeof window !== "undefined" ? window.innerHeight * 3.8 : 3000;
    
    if (latest > triggerPoint) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-6 pointer-events-none"
    >
      {/* Logo Area */}
      <div className="pointer-events-auto mix-blend-difference text-white">
        <Link 
          href="/" 
          className="group flex items-center gap-4"
        >
           {/* Diamond Monogram */}
           <div className="relative w-9 h-9 flex items-center justify-center bg-white text-black rounded-sm transform rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]">
              <span className="font-sans text-xl font-black -rotate-45 transition-transform duration-500 group-hover:-rotate-[225deg]">N</span>
           </div>
           
           {/* Architectural Text Lockup */}
           <div className="flex flex-col gap-1">
             <span className="font-sans text-sm font-bold tracking-[0.2em] uppercase leading-none">
               Nikhil
             </span>
             <span className="font-sans text-[0.65rem] font-medium tracking-[0.15em] uppercase leading-none opacity-70">
               Wakchaure
             </span>
           </div>
        </Link>
      </div>

      {/* Navigation Links - Unique Floating Layout */}
      {/* Glass Pill: Visible Blur, No Mix-Blend so it looks like physical glass */}
      {/* Navigation Links - Unique Floating Layout */}
      {/* Glass Pill: Visible Blur, No Mix-Blend so it looks like physical glass */}
      {/* Navigation Links - Unique Floating Layout */}
      {/* Glass Pill: Visible Blur, No Mix-Blend so it looks like physical glass */}
      <div 
        className="hidden md:flex pointer-events-auto items-center gap-1 backdrop-blur-md bg-white/20 py-1.5 px-2 rounded-full border border-white/20 shadow-xl shadow-black/5 transition-all duration-300"
        onMouseLeave={() => setHovered(null)}
      >
        
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            onMouseEnter={() => setHovered(link.name)}
            className="relative px-5 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-widest text-[#0a0a0a] transition-colors duration-300"
          >
            <span className="relative z-10">{link.name}</span>
            {hovered === link.name && (
              <motion.span
                layoutId="nav-hover"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
          </Link>
        ))}

        <div className="w-[1px] h-4 bg-[#1a1a1a]/10 dark:bg-white/10 mx-2" />
        
        <Link 
            href="#contact"
            className="px-6 py-2 rounded-full bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border border-black/10 dark:border-white/10 text-xs font-bold font-sans uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-sm"
        >
            Let's Talk
        </Link>

        {/* Integrated Theme Toggle */}
        <div className="pl-2 border-l border-black/5 dark:border-white/10 ml-2">
           <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden pointer-events-auto mix-blend-difference text-white">
          <button className="font-sans text-sm font-bold uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
              Menu
          </button>
      </div>
    </motion.nav>
  );
}
