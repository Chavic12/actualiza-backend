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

    @Column()
    duracion: string;

    @Column()
    fecha: string;

    @Column()
    imgen: string;

    @Column()
    estado: string;

    @Column()
    hora: string;

    @ManyToMany(() => Area, area => area.eventos)
    @JoinTable()
  areas: Area;

}
