import { HttpService } from '@nestjs/axios';
export declare class CommunicationService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getDataFromPi2(): Promise<any>;
    private handleError;
}
