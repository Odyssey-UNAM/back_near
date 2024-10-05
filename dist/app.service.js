"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppService = class AppService {
    constructor() {
        this.API_KEY = 'bZQQyist6UgMcNUmdxHPQbWiunaxFAf0UlXboQXS';
        this.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
    }
    async getAllData(startDate) {
        const url = `${this.BASE_URL}/feed`;
        const params = {
            api_key: this.API_KEY,
            start_date: startDate,
            end_date: startDate,
        };
        try {
            const response = await axios_1.default.get(url, { params });
            const nearEarthObjects = response.data.near_earth_objects || {};
            let allData = [];
            for (const date in nearEarthObjects) {
                allData = allData.concat(nearEarthObjects[date]);
            }
            return allData;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(`Error fetching data: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getIdsFromData(allData) {
        return allData.map((neo) => neo.id);
    }
    async getOrbitalData(asteroidId) {
        const url = `${this.BASE_URL}/neo/${asteroidId}`;
        const params = {
            api_key: this.API_KEY,
        };
        try {
            const response = await axios_1.default.get(url, { params });
            return response.data.orbital_data || {};
        }
        catch (error) {
            if (error.response && error.response.status === 404) {
                throw new common_1.HttpException('Asteroid not found. Please verify the ID.', common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException(`Error fetching orbital data: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map