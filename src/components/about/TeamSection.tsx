import { AnimatedSection } from "../core/motion/AnimatedSection";
import { AnimatedFade } from "../core/motion/AnimatedFade";
import { TeamMemberCard } from "./TeamMemberCard";
import type { TeamMember } from "../../data/teamData";

export interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

/**
 * Tarjeta con borde que reúne al equipo.
 *
 * El margen superior negativo mete el borde por debajo de la banda musgo, tal
 * como en el mockup, donde el rectángulo arranca 49px antes de que acabe la
 * cabecera. Como la banda va después en el DOM y no lleva z-index, se pinta
 * encima y tapa esa franja del borde.
 */
export function TeamSection({ title, members }: TeamSectionProps) {
  return (
    // `yOffset={0}`: con desplazamiento vertical, la tarjeta parte más abajo de
    // su posición final y ese margen negativo aún no tapa el borde superior
    // contra la banda musgo, así que se ve asomar como una línea horizontal
    // durante la animación. Solo el fundido evita ese destape transitorio.
    <AnimatedSection delay={1} duration={6} yOffset={0}>
      <section className="-mt-[49px] z-0 rounded-b-[56px] border-3 border-accent px-8 pt-24 pb-16 sm:px-12 md:px-16 md:pt-28">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-wide text-accent md:text-5xl">
          {title}
        </h2>

        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((member, index) => (
            <AnimatedFade key={member.id} delay={0.3 + index * 0.08} scale={0.96}>
              <TeamMemberCard member={member} />
            </AnimatedFade>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}

export default TeamSection;
