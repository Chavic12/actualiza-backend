import { Area } from "../entities/area.entity";

export class CreateEventoDto {
    titulo: string;
    descripcion: string;
    duracion: number;
    fecha: string;
    imagen: string;
    estado: string;
    inicioHora: string;
    modalidad: string;
    areas: Area[]; // Aquí debes definir la propiedad areas como una lista de Area[]
  }
  