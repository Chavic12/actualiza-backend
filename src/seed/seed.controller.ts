import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get()
  async executeSeed() {
    await this.seedService.executeSeed();
    return { message: 'Seed completed successfully' };
  }
}
