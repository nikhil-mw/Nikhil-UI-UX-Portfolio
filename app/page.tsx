import ScrollyCanvas from "../components/ScrollyCanvas";
import { Projects } from "../components/Projects";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-white/20">
      <Navbar />

      <ScrollyCanvas />
      
      <Projects />
    </main>
  );
}
