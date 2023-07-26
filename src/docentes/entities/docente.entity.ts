import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

@Entity()
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombreDocente: string;

  @Column()
  apellidoDocente: string;

  @Column()
  identificacion: string;

  @Column()
  correo: string;
  
  @Column()
  carrera: string;

  @Column()
  telefono: string;

  @Column()
  imagen: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @ManyToMany(() => Area, area => area.docentes)
  @JoinTable()
  areas: Area[];
 
}
