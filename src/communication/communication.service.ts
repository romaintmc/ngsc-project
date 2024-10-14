import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CommunicationService {
  constructor(private readonly httpService: HttpService) {}

    async getDataFromPi2(): Promise<any> {
        try {
            const response = await lastValueFrom(this.httpService.get('http://10.180.150.76:3000/sensors'));
            return response.data;
        }
        catch (error) {
            console.error('Error fetching sensor data:', error.message);
            throw this.handleError(error);
            //throw new Error('Failed to fetch sensor data'); 
        }
    }
    private handleError(error: AxiosError) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);

        throw new HttpException(error.response?.data, error.response?.status);

        } else if (error.request) {
            console.error('Error request:', error.request);
            throw new HttpException('Failed to send request', HttpStatus.REQUEST_TIMEOUT);
        } else {
            console.error('Error message:', error.message);
            throw new HttpException('Failed to send request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}