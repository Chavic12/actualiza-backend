import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Docente } from "./docente.entity";
import { Evento } from "./evento.entity";

@Entity()
export class Area {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    nombre: string;
  
    @ManyToOne(() => Docente, (docente) => docente.areas)
    docentes: Docente[];
  
    @ManyToOne(() => Evento, (evento) => evento.areas)
    eventos: Evento[];
}