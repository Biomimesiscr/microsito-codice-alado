/**
 * Equipo del CICIMA. Fuente única: lo consumen la página de contacto (solo la
 * persona de referencia) y la de «sobre nosotros» (la lista completa), así que
 * vive fuera de ambas carpetas de feature.
 *
 * El nombre va literal (es un nombre propio), igual que los géneros en
 * `speciesData.ts`. El rol sí se traduce y se resuelve por `id` contra
 * `contact.team.<id>.role`: en español está marcado en género
 * («Investigadora»), así que una clave compartida no valdría para todo el equipo.
 *
 * Si falta una foto en `public/team/`, `Portrait` cae a un placeholder: basta
 * con subir el archivo para que aparezca la real sin tocar código.
 */

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
}

export const team: TeamMember[] = [
  { id: "rebeca", name: "Rebeca Mora Castro", photo: "/team/rebeca-mora-castro.png" },
  { id: "jorge", name: "Jorge Salazar Ruíz", photo: "/team/jorge-salazar-ruiz.png" },
  { id: "lorena", name: "Lorena Cubero Arias", photo: "/team/lorena-cubero-arias.png" },
  { id: "marco", name: "Marco Beltrán Calvo", photo: "/team/marco-beltran-calvo.png" },
  { id: "luis", name: "Luis Fonseca Rojas", photo: "/team/luis-fonseca-rojas.png" },
];
