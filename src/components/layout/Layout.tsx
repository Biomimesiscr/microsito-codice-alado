import { Outlet } from "react-router";
import { Header } from "./Header";
import { AnimatedFade } from "../core/motion/AnimatedFade";

export function Layout() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-sans">
      <AnimatedFade duration={1.5} className="absolute inset-0 w-full h-full z-0">
        <img
          src="/landingbg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </AnimatedFade>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-0"></div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;