import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Area } from './entities/area.entity';
import { Evento } from './entities/evento.entity';


@Module({
  controllers: [DocentesController],
  providers: [DocentesService],
  imports: [
    TypeOrmModule.forFeature([ Docente, Area, Evento ]),
  ],
  exports: [
    DocentesService,
    TypeOrmModule
  ]
})
export class DocentesModule {}
