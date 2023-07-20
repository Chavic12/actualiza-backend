import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(
        () => Area,
        area => area.eventos,
        {cascade: true}
        )
    areas?: Area[];
}
