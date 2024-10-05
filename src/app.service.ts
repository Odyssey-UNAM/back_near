import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly API_KEY = 'bZQQyist6UgMcNUmdxHPQbWiunaxFAf0UlXboQXS'; // Replace with your actual API key
  private readonly BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

  async getAllData(startDate: string): Promise<any[]> {
    const url = `${this.BASE_URL}/feed`;
    const params = {
      api_key: this.API_KEY,
      start_date: startDate,
      end_date: startDate,
    };

    try {
      const response = await axios.get(url, { params });
      // console.log(response.data);
      // console.log(url);
      const nearEarthObjects = response.data.near_earth_objects || {};
      let allData = [];

      for (const date in nearEarthObjects) {
        allData = allData.concat(nearEarthObjects[date]);
      }
      // console.log(allData);
      return allData;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error fetching data: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getIdsFromData(allData: any[]): string[] {
    return allData.map((neo) => neo.id);
  }

  async getOrbitalData(asteroidId: string): Promise<any> {
    const url = `${this.BASE_URL}/neo/${asteroidId}`;
    const params = {
      api_key: this.API_KEY,
    };

    try {
      const response = await axios.get(url, { params });
      return response.data.orbital_data || {};
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException(
          'Asteroid not found. Please verify the ID.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          `Error fetching orbital data: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
