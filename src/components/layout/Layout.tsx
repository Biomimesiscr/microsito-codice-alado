import { Outlet } from "react-router";
import { Header } from "./Header";
import { Surface } from "./Surface";
import type { DecorSlot } from "../decor/Decor";

// Los PNG son 1440x1024: la caja debe llevar ese aspect para que `contain`
// no deje franjas vacías y la posición sea predecible.
const decor: DecorSlot[] = [
  {
    src: "/illustrations/home2.png",
    className:
      "top-[2%] -right-[14%] h-[62%] aspect-[1440/1024] text-accent",
  },
  {
    src: "/illustrations/home1.png",
    className:
      "-bottom-[14%] -left-[16%] h-[62%] aspect-[1440/1024] text-heading opacity-85",
  },
];

export function Layout() {
  return (
    <Surface tone="cream" decor={decor}>
      <div className="relative z-10 w-full h-full flex flex-col">
        <Header />
        <Outlet />
      </div>
    </Surface>
  );
}

export default Layout;
