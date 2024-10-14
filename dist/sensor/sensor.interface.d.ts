import { IClientOptions } from 'mqtt';
import * as net from 'net';
export interface Sensor {
    sensor_id: number;
    name: string;
    type: string;
    location: string;
    created_at: Date;
}
export interface Protocol {
    id: number;
    name: string;
}
export interface MqttProtocol extends IClientOptions, Protocol {
    clientId?: string;
    name: string;
    topic: string;
    url: string;
    username?: string;
    password?: string;
}
export interface TcpProtocol extends net.TcpSocketConnectOpts, Protocol {
    request: string;
    name: string;
    port: number;
    host: string;
}
