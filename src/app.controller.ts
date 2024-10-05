import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  async getAllData(@Query('date') date: string) {
    const allData = await this.appService.getAllData(date);
    const ids = this.appService.getIdsFromData(allData);

    // Mostrar la información en la consola
    console.log('Fecha:', date);
    console.log('Todos los datos:', allData);
    console.log('IDs disponibles:', ids);

    return {
      total_objects: allData.length,
      ids_available: ids,
      data: allData,
    };
  }

  @Get('orbital-data/:id')
  async getOrbitalData(@Param('id') id: string) {
    const orbitalData = await this.appService.getOrbitalData(id);

    // Mostrar la información en la consola
    console.log('ID:', id);
    console.log('Datos orbitales:', orbitalData);

    if (!orbitalData || Object.keys(orbitalData).length === 0) {
      throw new NotFoundException('No orbital data found for this object.');
    }

    return orbitalData;
  }
}
