import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getAllData(date: string): Promise<{
        total_objects: number;
        ids_available: string[];
        data: any[];
    }>;
    getOrbitalData(id: string): Promise<any>;
}
