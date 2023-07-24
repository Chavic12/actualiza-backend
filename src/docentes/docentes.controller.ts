import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Area } from './entities/area.entity';
import { Docente } from './entities/docente.entity';
import { Evento } from './entities/evento.entity';

@Controller()
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  // Métodos para la entidad Area
  @Get('areas')
  async getAllAreas(): Promise<Area[]> {
    return this.docentesService.findAllAreas();
  }

  @Get('areas/:id')
  async getAreaById(@Param('id', ParseIntPipe) id: number): Promise<Area> {
    return this.docentesService.findAreaById(id);
  }

  @Post('areas')
  async createArea(@Body() areaData: Partial<Area>): Promise<Area> {
    return this.docentesService.createArea(areaData);
  }

  @Put('areas/:id')
  async updateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() areaData: Partial<Area>,
  ): Promise<Area> {
    return this.docentesService.updateArea(id, areaData);
  }

  @Delete('areas/:id')
  async deleteArea(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.docentesService.deleteArea(id);
  }

  // // Métodos para la entidad Docente
  // @Get('docentes')
  // async getAllDocentes(): Promise<Docente[]> {
  //   return this.docentesService.findAllDocentes();
  // }

  @Get('docentes/:id')
  async getDocenteById(@Param('id') id: number): Promise<Docente> {
    return this.docentesService.findDocenteById(id);
  }

  @Post('docentes')
  async createDocente(@Body() docenteData: Partial<Docente>): Promise<Docente> {
    return this.docentesService.createDocente(docenteData);
  }

  @Put('docentes/:id')
  async updateDocente(
    @Param('id') id: number,
    @Body() docenteData: Partial<Docente>,
  ): Promise<Docente> {
    return this.docentesService.updateDocente(id, docenteData);
  }

  @Delete('docentes/:id')
  async deleteDocente(@Param('id') id: number): Promise<void> {
    return this.docentesService.deleteDocente(id);
  }

  // Métodos para la entidad Evento
  @Get('eventos')
  async getAllEventos(): Promise<Evento[]> {
    return this.docentesService.findAllEventos();
  }

  @Get('eventos/:id')
  async getEventosById(@Param('id') id: number): Promise<Evento> {
    return this.docentesService.findEventoById(id);
  }

  @Post('eventos')
  async createEvento(@Body() eventoData: Partial<Docente>): Promise<Evento> {
    return this.docentesService.createEvento(eventoData);
  }

  @Put('eventos/:id')
  async updateEvento(
    @Param('id') id: number,
    @Body() eventoData: Partial<Evento>,
  ): Promise<Evento> {
    return this.docentesService.updateEvento(id, eventoData);
  }

  @Delete('eventos/:id')
  async deleteEvento(@Param('id') id: number): Promise<void> {
    return this.docentesService.deleteEvento(id);
  }

  @Get(':tipo')
  async getDataWithAreas(@Param('tipo') tipo: string) {
    if (tipo === 'docentes') {
      return this.docentesService.getAllDocentesWithAreas();
    } else if (tipo === 'eventos') {
      return this.docentesService.getAllEventosWithAreas();
    } else {
      // Si no se proporciona el tipo o no coincide con 'docentes' o 'eventos'
      throw new NotFoundException('Tipo de datos no válido');
    }
  }
}
