import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

@Entity()
export class Docente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    nombre: string;

    @Column('text')
    identificacion: string;
    
    @Column('text')
    carrera: string;

    @Column('text')
    telefono: string;

    @Column('text')
    descripcion: string;

    @OneToMany(() => Area,
    area => area.docentes,
    {cascade: true})
    areas: Area[];
}
