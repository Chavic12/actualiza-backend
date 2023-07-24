import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

@Entity()
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  nombreDocente: string;

  @Column('text')
  apellidoDocente: string;

  @Column('text')
  identificacion: string;

  @Column('text')
  correo: string;
  
  @Column('text')
  carrera: string;

  @Column('text')
  telefono: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  estado: string;

  @ManyToMany(() => Area, area => area.docentes)
  @JoinTable()
  areas: Area;
 
}
