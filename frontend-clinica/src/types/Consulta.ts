import type { Medico } from "./Medico";
import type { Paciente } from "./Paciente";

export interface Consulta {
  id: string;
  data: Date;
  pacienteId: string;
  medicoId: string;
  paciente?: Paciente;
  medico?: Medico;
}
