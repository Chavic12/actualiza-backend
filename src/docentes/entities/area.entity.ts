import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Docente } from "./docente.entity";
import { Evento } from "./evento.entity";

@Entity()
export class Area {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombreArea: string;

  @ManyToMany(() => Docente, docente => docente.areas)
  docentes: Docente[];

  @ManyToMany(() => Evento, evento => evento.areas)
  eventos: Evento[];
}
