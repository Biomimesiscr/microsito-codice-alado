/**
 * Personas de contacto.
 *
 * El nombre va literal (es un nombre propio). El rol se traduce y se resuelve
 * por `id` contra `contact.team.<id>.role`: en español está marcado en género
 * («Investigadora»), así que una clave compartida no valdría para todo el equipo.
 *
 * `photo` todavía no existe en `public/`: `Portrait` cae a un placeholder hasta
 * que se suba el archivo.
 */

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
}

export const team: TeamMember[] = [
  {
    id: "rebeca",
    name: "Rebeca Mora Castro",
    photo: "/team/rebeca-mora-castro.jpg",
  },
];
