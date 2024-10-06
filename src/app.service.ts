import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly API_KEYS = [
    // Reemplaza con tus API keys reales
    'SBDEqwgg0Gsja11XYuYZHQUjfRH9bxzGNp59jXeY',
    'xBOdYxfJmOvYiOWAhZ4ua6xQHSB7fcZkJIAx2QZ8',
    'ObuJTjKs1WUQHAExJEnMoq7cr3r2ouTjcSVZ0V1d',
    'A5aC8RQOhmwlQkuLz8bPNPcBgkSZiLdQCmFkR9YE',
    'LzbE7zxB6n4jdeDHI4fCsBmRzvPGsypMHcfwkvdA',
    'PayuVafommV3he8QDzZdXw4kf4trOhDPSNvOSs6L',
    'ADexkO1eDwl7JhZOFEKIn706eUDJmaBlSS3Ml43K',
    'cJQ2PsEsosneuL0kRDniCVZxUekANtW2zm2NE0LH',
    'fnM1DuD4NtUA3yaILFLBWQjyDsdfBdhEeXFpCc2y',
    'Oa1q3AdvXZd5hAVaWcTQyQxhlKOwqHHFCA2QbL5H',
    'BHuZwRKH7rvHJnSuCJcbNZRodww5Pd7xFKPetKQ3',
    'fSIuwwNdF2IJx9rHB3TPSDphrDYMzg8n6ytpSp5T',
  ];
  private readonly BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

  private getRandomApiKey(): string {
    const randomIndex = Math.floor(Math.random() * this.API_KEYS.length);
    return this.API_KEYS[randomIndex];
  }

  async getAllData(startDate: string): Promise<any[]> {
    const url = `${this.BASE_URL}/feed`;
    const params = {
      api_key: this.getRandomApiKey(),
      start_date: startDate,
      end_date: startDate,
    };

    try {
      const response = await axios.get(url, { params });
      const nearEarthObjects = response.data.near_earth_objects || {};
      let allData = [];

      for (const date in nearEarthObjects) {
        allData = allData.concat(nearEarthObjects[date]);
      }
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
      api_key: this.getRandomApiKey(),
    };

    try {
      const response = await axios.get(url, { params });
      console.log(response.data);
      console.log(url);
      return response.data || {};
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
