export declare class AppService {
    private readonly API_KEYS;
    private readonly BASE_URL;
    private getRandomApiKey;
    getAllData(startDate: string): Promise<any[]>;
    getIdsFromData(allData: any[]): string[];
    getOrbitalData(asteroidId: string): Promise<any>;
}
