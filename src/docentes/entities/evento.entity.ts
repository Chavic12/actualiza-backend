import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

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

    @Column()
    imagen: string;

    @Column()
    estado: string;

    @Column()
    inicioHora: string;

    @Column()
    modalidad: string;


    @ManyToMany(() => Area, area => area.eventos)
    @JoinTable()
    areas: Area[];

}
