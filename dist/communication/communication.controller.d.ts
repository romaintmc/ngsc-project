import { CommunicationService } from './communication.service';
export declare class CommunicationController {
    private readonly CommunicationService;
    constructor(CommunicationService: CommunicationService);
    getDataFromPi2(): Promise<any>;
}
