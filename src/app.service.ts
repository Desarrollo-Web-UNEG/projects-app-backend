import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkDatabaseConnection() {
    try {
      if (this.dataSource.isInitialized) {
        return {
          status: 'ok',
          message: 'Conexión a la base de datos establecida correctamente',
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          status: 'error',
          message: 'No hay conexión a la base de datos',
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: `Error al conectar con la base de datos: ${error.message}`,
        timestamp: new Date().toISOString()
      };
    }
  }
}
