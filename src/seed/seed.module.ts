import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DocentesModule } from './../docentes/docentes.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    DocentesModule
  ]
})
export class SeedModule {}
