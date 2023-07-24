import { Injectable } from '@nestjs/common';

import { Area } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { Evento } from './entities/evento.entity';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(Docente)
    private docenteRepository: Repository<Docente>,
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}


  // Métodos para la entidad Area
  async findAllAreas(): Promise<Area[]> {
    return this.areaRepository.find();
  }

  async findAreaById(id: number): Promise<Area> {
    const options: FindOneOptions<Area> = { where: { id } };
    
    return this.areaRepository.findOne(options);
  }
  

  async createArea(areaData: Partial<Area>): Promise<Area> {
    const area = this.areaRepository.create(areaData);
    return this.areaRepository.save(area);
  }

  async updateArea(id: number, areaData: Partial<Area>): Promise<Area> {
    const options: FindOneOptions<Area> = { where: { id } };
    const area = await this.areaRepository.findOne(options);
    if (!area) {
      throw new Error('Area not found');
    }
    Object.assign(area, areaData);
    return this.areaRepository.save(area);
  }

  async deleteArea(id: number): Promise<void> {
    const options: FindOneOptions<Area> = { where: { id } };
    const area = await this.areaRepository.findOne(options);
    if (!area) {
      throw new Error('Area not found');
    }
    await this.areaRepository.remove(area);
  }


  

  // Métodos para la entidad Docente
  async findAllDocentes(): Promise<Docente[]> {
    return this.docenteRepository.find();
  }

  async findDocenteById(id: number): Promise<Docente> {
    const options: FindOneOptions<Docente> = { where: { id } };
    
    return this.docenteRepository.findOne(options);
  }

  async createDocente(docenteData: Partial<Docente>): Promise<Docente> {
    const docente = this.docenteRepository.create(docenteData);
    return this.docenteRepository.save(docente);
  }

  async updateDocente(id: number, docenteData: Partial<Docente>): Promise<Docente> {
    const options: FindOneOptions<Docente> = { where: { id } };
    const docente = await this.docenteRepository.findOne(options);
    if (!docente) {
      throw new Error('Docente not found');
    }
    Object.assign(docente, docenteData);
    return this.docenteRepository.save(docente);
  }

  async deleteDocente(id: number): Promise<void> {
    const options: FindOneOptions<Docente> = { where: { id } };
    const docente = await this.docenteRepository.findOne(options);
    if (!docente) {
      throw new Error('Docente not found');
    }
    await this.docenteRepository.remove(docente);
  }

  // Métodos para la entidad Evento
  async findAllEventos(): Promise<Evento[]> {
    return this.eventoRepository.find();
  }

  async findEventoById(id: number): Promise<Evento> {
    const options: FindOneOptions<Evento> = { where: { id } };
    return this.eventoRepository.findOne(options);
  }

  async createEvento(eventoData: Partial<Evento>): Promise<Evento> {
    const evento = this.eventoRepository.create(eventoData);
    return this.eventoRepository.save(evento);
  }

  async updateEvento(id: number, eventoData: Partial<Evento>): Promise<Evento> {
    const options: FindOneOptions<Evento> = { where: { id } };
    const evento = await this.eventoRepository.findOne(options);
    if (!evento) {
      throw new Error('Evento not found');
    }
    Object.assign(evento, eventoData);
    return this.eventoRepository.save(evento);
  }

  async deleteEvento(id: number): Promise<void> {
    const options: FindOneOptions<Evento> = { where: { id } };
    const evento = await this.eventoRepository.findOne(options);
    if (!evento) {
      throw new Error('Evento not found');
    }
    await this.eventoRepository.remove(evento);
  }

  async getAllDocentesWithAreas(): Promise<Docente[]> {
    return this.docenteRepository
      .createQueryBuilder('docente')
      .leftJoinAndSelect('docente.areas', 'areas')
      .getMany();
  }

  async getAllEventosWithAreas(): Promise<Evento[]> {
    return this.eventoRepository
      .createQueryBuilder('evento')
      .leftJoinAndSelect('evento.areas', 'areas')
      .getMany();
  }

  async findDocenteByIdWithAreas(id: number): Promise<Docente> {
    return this.docenteRepository
      .createQueryBuilder('docente')
      .leftJoinAndSelect('docente.areas', 'areas')
      .where('docente.id = :id', { id })
      .getOne();
  }

  async findEventoByIdWithAreas(id: number): Promise<Evento> {
    return this.eventoRepository
      .createQueryBuilder('evento')
      .leftJoinAndSelect('evento.areas', 'areas')
      .where('evento.id = :id', { id })
      .getOne();
  }

  
}

