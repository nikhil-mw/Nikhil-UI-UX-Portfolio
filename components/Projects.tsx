"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "Orion",
    category: "AI Analytics",
    description: "Futuristic AI command center featuring real-time visualization and predictive modeling.",
    imageUrl: "/projects/orion.png",
    year: "2024",
    tags: ["WebGL", "Next.js"]
  },
  {
    id: "02",
    title: "Nexus Pay",
    category: "Fintech",
    description: "Seamless mobile payment ecosystem combining glassmorphism with banking security.",
    imageUrl: "/projects/nexus.png",
    year: "2024",
    tags: ["App", "Finance"]
  },
  {
    id: "03",
    title: "Aura",
    category: "Wellness",
    description: "Mindfulness and sleep analysis app with a calming, nature-inspired interface.",
    imageUrl: "/projects/aura.png",
    year: "2025",
    tags: ["Health", "Zen"]
  },
  {
    id: "04",
    title: "Sentinel",
    category: "Security",
    description: "Military-grade cybersecurity monitoring dash with matrix-style threat streams.",
    imageUrl: "/projects/cyber.png",
    year: "2023",
    tags: ["SecOps", "Data"]
  },
  {
    id: "05",
    title: "Eco Sphere",
    category: "IoT / Green",
    description: "Smart home sustainability dashboard tracking energy usage and carbon footprints.",
    imageUrl: "/projects/eco.png",
    year: "2025",
    tags: ["IoT", "Green"]
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <section className="bg-background py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
            <div>
                <span className="block text-sm mb-4 text-foreground/60 tracking-widest uppercase" style={{ fontFamily: 'var(--font-goga)' }}>
                    // Featured Projects
                </span>
                <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase leading-[0.85] tracking-tight" style={{ fontFamily: 'var(--font-goga)' }}>
                    Selected<br/>Works
                </h2>
            </div>
            <div className="md:max-w-md md:text-right">
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed" style={{ fontFamily: 'var(--font-goga)' }}>
                    A curated collection of digital experiences crafted with precision, interaction, and purpose.
                </p>
            </div>
        </motion.div>

        {/* Desktop Split Layout */}
        <div className="hidden md:flex gap-16 lg:gap-32">
            
            {/* Left: Interactive List */}
            <div className="w-5/12 flex flex-col justify-center">
                {projects.map((project) => (
                    <div 
                        key={project.id}
                        onMouseEnter={() => setActiveProject(project)}
                        className={`
                            group cursor-pointer flex items-center justify-between py-10 border-b border-foreground/10 transition-all duration-300
                            ${activeProject.id === project.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                        `}
                    >
                        <div className="flex items-baseline gap-6">
                            <span className="text-sm font-bold text-foreground/40" style={{ fontFamily: 'var(--font-goga)' }}>
                                {project.id}
                            </span>
                            <h3 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: 'var(--font-goga)' }}>
                                {project.title}
                            </h3>
                        </div>
                        <div className={`transition-transform duration-500 ease-out ${activeProject.id === project.id ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                            <ArrowRight className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Right: Sticky Preview */}
            <div className="w-7/12 relative h-[600px]">
                <div className="sticky top-32 w-full h-full rounded-[2rem] overflow-hidden bg-foreground/5 shadow-2xl">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={activeProject.imageUrl}
                                alt={activeProject.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            
                            {/* Overlay Details */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 p-10 w-full text-white">
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {activeProject.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 text-sm border border-white/20 rounded-full bg-white/5 backdrop-blur-md" style={{ fontFamily: 'var(--font-goga)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h4 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-goga)' }}>{activeProject.title}</h4>
                                <p className="text-xl leading-relaxed text-white/80 max-w-lg" style={{ fontFamily: 'var(--font-goga)' }}>
                                    {activeProject.description}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Mobile: Compact Stack */}
        <div className="flex md:hidden flex-col gap-16">
            {projects.map((project) => (
                <div key={project.id} className="group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-foreground/5 mb-6">
                         <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-3 border-b border-foreground/10 pb-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-foreground/50" style={{ fontFamily: 'var(--font-goga)' }}>{project.category}</span>
                        <span className="text-sm font-bold text-foreground/50" style={{ fontFamily: 'var(--font-goga)' }}>{project.year}</span>
                    </div>
                    <h3 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-goga)' }}>
                        {project.title}
                    </h3>
                    <p className="text-foreground/70 text-lg leading-relaxed mb-6" style={{ fontFamily: 'var(--font-goga)' }}>
                        {project.description}
                    </p>
                    <button className="flex items-center gap-2 text-base font-bold text-foreground hover:underline underline-offset-4" style={{ fontFamily: 'var(--font-goga)' }}>
                        View Case Study <ArrowUpRight className="w-5 h-5"/>
                    </button>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
