export declare class AppService {
    private readonly API_KEY;
    private readonly BASE_URL;
    getAllData(startDate: string): Promise<any[]>;
    getIdsFromData(allData: any[]): string[];
    getOrbitalData(asteroidId: string): Promise<any>;
}
