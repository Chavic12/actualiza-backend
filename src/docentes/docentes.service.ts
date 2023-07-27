import { Injectable, NotFoundException } from '@nestjs/common';

import { Area } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, getManager } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { CreateDocenteDto } from './dto/create-docente.dto';

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

  async findDocenteById(idD: number): Promise<Docente> {
    const options: FindOneOptions<Docente> = { where: { idD } };

    return this.docenteRepository.findOne(options);
  }

  async createDocente(docenteData: Partial<Docente>): Promise<Docente> {
    const docente = this.docenteRepository.create(docenteData);
    return this.docenteRepository.save(docente);
  }

  async updateDocente(
    idD: number,
    docenteData: Partial<Docente>,
  ): Promise<Docente> {
    const options: FindOneOptions<Docente> = { where: { idD } };
    const docente = await this.docenteRepository.findOne(options);
    if (!docente) {
      throw new Error('Docente not found');
    }
    Object.assign(docente, docenteData);
    return this.docenteRepository.save(docente);
  }

  async deleteDocente(idD: number): Promise<void> {
    const options: FindOneOptions<Docente> = { where: { idD } };
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

  async partialUpdateDocente(
    idD: number,
    docenteData: Partial<Docente>,
  ): Promise<Docente> {
    const options: FindOneOptions<Docente> = { where: { idD } };
    const docente = await this.docenteRepository.findOne(options);
    if (!docente) {
      throw new NotFoundException('Docente not found');
    }
    Object.assign(docente, docenteData);
    return this.docenteRepository.save(docente);
  }

  async partialUpdateEvento(
    id: number,
    eventoData: Partial<Evento>,
  ): Promise<Evento> {
    const options: FindOneOptions<Evento> = { where: { id } };
    const evento = await this.eventoRepository.findOne(options);
    if (!evento) {
      throw new NotFoundException('Evento not found');
    }
    Object.assign(evento, eventoData);
    return this.eventoRepository.save(evento);
  }

  async partialUpdateArea(id: number, areaData: Partial<Area>): Promise<Area> {
    const options: FindOneOptions<Area> = { where: { id } };
    const area = await this.areaRepository.findOne(options);
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    Object.assign(area, areaData);
    return this.areaRepository.save(area);
  }

    
  

  // Método para crear un nuevo evento con imagen
  async createEventoWithImage(
    eventoData: CreateEventoDto,
    imagen: Express.Multer.File,
  ): Promise<Evento> {
    // Aquí puedes realizar la lógica para guardar la imagen en el servidor y obtener la URL
    const imageUrl = '/uploads'; // Cambia esto con la URL de la imagen en el servidor

    // Asignar la URL de la imagen al atributo "imagen" del evento
    eventoData.imagen = imageUrl;

    // Asignar el nombre de archivo único al atributo "imagenNombre" del evento
    eventoData.imagen = imagen.filename;

    // Crear y guardar el evento en la base de datos
    const evento = this.eventoRepository.create(eventoData);
    return this.eventoRepository.save(evento);
  }


  async createDocenteWithImage(
    docenteData: CreateDocenteDto,
    imagen: Express.Multer.File,
  ): Promise<Docente> {
    // Aquí puedes realizar la lógica para guardar la imagen en el servidor y obtener la URL
    const imageUrl = '/uploads';

    // Asignar la URL de la imagen al atributo "imagen" del evento
    docenteData.imagen = imageUrl;

    // Asignar el nombre de archivo único al atributo "imagenNombre" del evento
    docenteData.imagen = imagen.filename;

    // Crear y guardar el docente en la base de datos
    const docente = this.docenteRepository.create(docenteData);
    return this.docenteRepository.save(docente);
  }


  async confirmarEvento(id: number): Promise<Evento> {
    const options: FindOneOptions<Evento> = { where: { id } };
    // Lógica para confirmar el evento, por ejemplo, actualizando el estado del evento en la base de datos a "confirmado"
    const evento = await this.eventoRepository.findOne(options);
    if (!evento) {
      // Manejar si el evento no existe
      throw new NotFoundException('Evento no encontrado');
    }
  
    evento.estado = 'confirmado';
    return this.eventoRepository.save(evento);
  }
  async rechazarEvento(id: number): Promise<Evento> {
    const options: FindOneOptions<Evento> = { where: { id } };
    const evento = await this.eventoRepository.findOne(options);
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }

    evento.estado = 'rechazado';
    evento.docente = null; // Si se rechaza el evento, se puede eliminar la relación con el docente (si lo tiene asignado).

    return this.eventoRepository.save(evento);
  }

  

}
