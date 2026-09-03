import { useNavigate } from "react-router";
import type { SpeciesItem } from "./speciesData";

export interface SpeciesCardProps {
  species: SpeciesItem;
  subtitle: string;
}

export function SpeciesCard({ species, subtitle }: SpeciesCardProps) {
  const navigate = useNavigate();


  function changeImage() {
    const btn = document.getElementById(`species-card-${species.id}`);
    btn?.addEventListener("mouseover", () => {
      const img = btn.querySelector("img");
      if (img) {
        img.setAttribute("src", species.image);
      }
    });

    btn?.addEventListener("mouseout", () => {
      const img = btn.querySelector("img");
      if (img) {
        img.setAttribute("src", species.illustration);
      }
    });
  }

  changeImage();

  return (
    <button
      type="button"
      id={`species-card-${species.id}`}
      onClick={() => navigate(species.to)}
      className="group block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-2xl"
    >
      {/*
        `data-surface="olive"` convierte este panel en una isla oliva dentro de
        la página crema: bg-surface pasa a oliva y text-fg a salvia, así que la
        ilustración toma el color correcto sin declarar ningún valor nuevo.
      */}
      <div
        data-surface="olive"
        className="relative aspect-16/10 overflow-hidden rounded-2xl bg-surface text-fg"
      >
        {/* El PNG trae mucho margen vacío alrededor del insecto, así que con
            `contain` quedaría diminuto: se amplía la máscara por encima de la
            caja para que la ilustración llene la tarjeta. */}
        {/* <Decor src={species.image} className="inset-0" style={{ maskSize: "135%", WebkitMaskSize: "135%" }} /> */}
        <img src="/illustrations/bugs/microavispa.png" alt={species.name} className="w-full h-full object-cover" />
      </div>

      {/* En reposo el texto va suelto sobre la crema; al hover aparece la
          franja arena y el nombre pasa a rust. */}
      <div className="rounded-b-2xl px-4 py-3 text-center transition-colors duration-300 group-hover:bg-surface-raised">
        <h3 className="text-lg font-bold text-fg transition-colors duration-300 group-hover:text-accent">
          {species.name}
        </h3>
        <p className="text-sm text-fg-muted">{subtitle}</p>
      </div>
    </button>
  );
}

export default SpeciesCard;
