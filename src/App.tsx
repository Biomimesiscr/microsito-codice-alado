import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { AnimatedFade } from "./components/core/motion/AnimatedFade";

function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-sans">
      <AnimatedFade duration={1.5} className="absolute inset-0 w-full h-full z-0">
        <img
          src="/landingbg.jpg"
          alt="Background placeholder"
          className="w-full h-full object-cover opacity-60"
        />
      </AnimatedFade>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-0"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />
        <Hero />
      </div>
    </main>
  );
}

export default App;