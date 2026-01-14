import ScrollyCanvas from "../components/ScrollyCanvas";
import { Projects } from "../components/Projects";
import { ThemeToggle } from "../components/theme-toggle";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-white/20">
      {/* Optional: Navigation/Header with Toggle */}
      <nav className="fixed top-6 right-6 z-50">
         <ThemeToggle />
      </nav>

      <ScrollyCanvas />
      
      <Projects />
    </main>
  );
}
