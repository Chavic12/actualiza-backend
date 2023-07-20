import { Injectable } from '@nestjs/common';
import { DocentesService } from 'src/docentes/docentes.service';
import { areasSeed } from './seed/areas.seed';
import { docentesSeed } from './seed/docentes.seed';
import { eventosSeed } from './seed/eventos.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/docentes/entities/area.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Evento } from 'src/docentes/entities/evento.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SeedService {

  private readonly docentesService: DocentesService;
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    @InjectRepository(Docente)
    private docenteRepository: Repository<Docente>,
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}
  
  async executeSeed() {
    
    await this.seedAreas();
    await this.seedDocentes();
    await this.seedEventos();
  }
  private async seedAreas() {
    const areas = areasSeed.map(areaData => this.areaRepository.create(areaData));
    await this.areaRepository.save(areas);
  }

  private async seedDocentes() {
    const docentes = docentesSeed.map(docenteData => this.docenteRepository.create(docenteData));
    await this.docenteRepository.save(docentes);
  }

  private async seedEventos() {
    const eventos = eventosSeed.map(eventoData => this.eventoRepository.create(eventoData));
    await this.eventoRepository.save(eventos);
  }

  private async insertNewDocente() {
    // await this.docentesService.deleteAllDocentes();
    return true;
  }
}
