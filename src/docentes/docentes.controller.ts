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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Area } from './entities/area.entity';
import { Docente } from './entities/docente.entity';
import { Evento } from './entities/evento.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  diskStorageOptions,
  editFileName,
  imageFileFilter,
} from '../utils/file-upload.utils';
import { CreateEventoDto } from './dto/create-evento.dto';
import { CreateDocenteDto } from './dto/create-docente.dto';

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

  // @Post('docentes')
  // async createDocente(@Body() docenteData: Partial<Docente>): Promise<Docente> {
  //   return this.docentesService.createDocente(docenteData);
  // }

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

  // // Métodos para la entidad Evento
  // @Get('eventos')
  // async getAllEventos(): Promise<Evento[]> {
  //   return this.docentesService.findAllEventos();
  // }

  @Get('eventos/:id')
  async getEventosById(@Param('id') id: number): Promise<Evento> {
    return this.docentesService.findEventoById(id);
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
  @Get('docentes/:id/with-areas')
  async getDocenteByIdWithAreas(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Docente> {
    return this.docentesService.findDocenteByIdWithAreas(id);
  }

  @Get('eventos/:id/with-areas')
  async getEventoByIdWithAreas(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Evento> {
    return this.docentesService.findEventoByIdWithAreas(id);
  }

  @Patch('docentes/:id')
  async partialUpdateDocente(
    @Param('id', ParseIntPipe) id: number,
    @Body() docenteData: Partial<Docente>,
  ): Promise<Docente> {
    return this.docentesService.partialUpdateDocente(id, docenteData);
  }

  @Patch('eventos/:id')
  async partialUpdateEvento(
    @Param('id', ParseIntPipe) id: number,
    @Body() eventoData: Partial<Evento>,
  ): Promise<Evento> {
    return this.docentesService.partialUpdateEvento(id, eventoData);
  }

  @Patch('areas/:id')
  async partialUpdateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() areaData: Partial<Area>,
  ): Promise<Area> {
    return this.docentesService.partialUpdateArea(id, areaData);
  }

  @Post('eventos')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage(diskStorageOptions), // Usamos las opciones de almacenamiento que definimos
      fileFilter: imageFileFilter,
    }),
  )
  async createEventoWithImage(
    @Body() eventoData: CreateEventoDto,
    @UploadedFile() imagen: Express.Multer.File,
  ): Promise<Evento> {
    if (imagen && imagen.filename) {
    // Si se proporcionó una imagen, procede con el procesamiento de la imagen
    // y llama al servicio para crear el docente con la imagen
    return this.docentesService.createEventoWithImage(eventoData, imagen);
  } else {
    // Si no se proporcionó una imagen, llama al servicio para crear el docente sin imagen
    return this.docentesService.createEvento(eventoData);
  }
  }

  @Post('docentes')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage(diskStorageOptions),
      fileFilter: imageFileFilter,
    }),
  )
  async createDocenteWithImage(
    @Body() docenteData: CreateDocenteDto,
    @UploadedFile() imagen: Express.Multer.File,
  ): Promise<Docente> {
    if (imagen && imagen.filename) {
      // Si se proporcionó una imagen, procede con el procesamiento de la imagen
      // y llama al servicio para crear el docente con la imagen
      return this.docentesService.createDocenteWithImage(docenteData, imagen);
    } else {
      // Si no se proporcionó una imagen, llama al servicio para crear el docente sin imagen
      return this.docentesService.createDocente(docenteData);
    }
  }
}
