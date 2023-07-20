import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Area } from './entities/area.entity';
import { Docente } from './entities/docente.entity';

@Controller('docentes')
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
  async updateArea(@Param('id', ParseIntPipe) id: number, @Body() areaData: Partial<Area>): Promise<Area> {
    return this.docentesService.updateArea(id, areaData);
  }

  @Delete('areas/:id')
  async deleteArea(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.docentesService.deleteArea(id);
  }

  // Métodos para la entidad Docente
  @Get('docentes')
  async getAllDocentes(): Promise<Docente[]> {
    return this.docentesService.findAllDocentes();
  }

  @Get('docentes/:id')
  async getDocenteById(@Param('id') id: number): Promise<Docente> {
    return this.docentesService.findDocenteById(id);
  }

  @Post('docentes')
  async createDocente(@Body() docenteData: Partial<Docente>): Promise<Docente> {
    return this.docentesService.createDocente(docenteData);
  }

  @Put('docentes/:id')
  async updateDocente(@Param('id') id: number, @Body() docenteData: Partial<Docente>): Promise<Docente> {
    return this.docentesService.updateDocente(id, docenteData);
  }

  @Delete('docentes/:id')
  async deleteDocente(@Param('id') id: number): Promise<void> {
    return this.docentesService.deleteDocente(id);
  }
}
