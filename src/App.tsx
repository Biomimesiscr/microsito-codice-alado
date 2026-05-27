import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";

function App() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-sans">
      {/* Placeholder Background Image */}
      <img
        src="/landingbg.jpg"
        alt="Background placeholder"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      />

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />
        <Hero />
      </div>
    </main>
  );
}

export default App;
