import { Area } from "../entities/area.entity";

export class CreateDocenteDto {
    nombreDocente: string;
    apellidoDocente: string;
    identificacion: string;
    correo: string;
    carrera: string;
    telefono: string;
    imagen: string;
    descripcion: string;
    estado: string;
    areas: Area[]; // Aquí debes definir la propiedad areas como una lista de Area[]
  }
  

