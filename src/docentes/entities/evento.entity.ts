import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Docente } from './docente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column('int')
  duracion: number;

  @Column()
  fecha: string;

  @Column({ nullable: true })
  imagen: string;

  @Column()
  estado: string;

  @Column()
  inicioHora: string;

  @Column()
  modalidad: string;

  @OneToOne(() => Docente)
  @JoinColumn()
  docente: Docente;

  @ManyToMany(() => Area, (area) => area.eventos)
  @JoinTable()
  areas: Area[];
}
