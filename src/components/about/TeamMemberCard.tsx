import { Portrait } from "../contact/Portrait";
import type { TeamMember } from "../../data/teamData";

export interface TeamMemberCardProps {
  member: TeamMember;
}

/**
 * Retrato + nombre. El nombre no pasa por i18n: es un nombre propio.
 *
 * El tamaño va por clases y no por la prop `size` de `Portrait` porque en el
 * mockup el círculo es de 209px solo en escritorio y tiene que encoger al
 * apilarse la rejilla.
 */
export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <Portrait
        src={member.photo}
        alt={member.name}
        className="size-[128px] md:size-[168px] lg:size-[209px]"
      />
      <figcaption className="text-center text-sm text-fg md:text-lg lg:text-2xl">
        {member.name}
      </figcaption>
    </figure>
  );
}

export default TeamMemberCard;
