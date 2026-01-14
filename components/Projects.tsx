"use client";

import { motion } from "framer-motion";

export function Projects() {
  const projects = [
    { title: "Project Alpha", category: "E-Commerce" },
    { title: "Neon Pulse", category: "Web Application" },
    { title: "Aether Lens", category: "Design System" },
    { title: "Cyber Trace", category: "Data Vis" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-16 tracking-tight"
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-video bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/60">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
            <p className="text-foreground/50">© 2026 Creative Portfolio.</p>
        </div>
      </div>
    </div>
  );
}
