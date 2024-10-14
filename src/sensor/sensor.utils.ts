import { SensorEntity } from './entity/sensor.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from './entity/data.entity';

// Requirements for the Excel extraction
const path = require('path');
const fs = require('fs');

let adviceLinks: { [type: string]: { [range: string]: string } } = {};
let globalSensorUtils: SensorUtils | null = null; // Utiliser une instance globale

@Injectable()
export class SensorUtils {
  sensorRepository: any;
  constructor() {
    // Construct the function in constructor
    this.loadSensorAdviceFromExcel();
  }

  // Function to get the parameter for HATEOAS link construction
  public async getSensorField(field: string) {
    return await (await this.sensorRepository.createQueryBuilder('sensor')
      .select(`sensor.${field}`)
      .distinct(true)
      .getRawMany())
      .map(item => item.sensor_type);
  }

  // Load advices from the Excel file in /data/sensor-data
  public async loadSensorAdviceFromExcel() {
    const filePath = path.resolve(__dirname, '../../data/sensor-data.xlsx'); 

    // Read XLSX file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[sheetName];

    // Convert data in array
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // 
    data.forEach(row => {
      const type = row[0] as string; 
      const minValue = row[1] as number; 
      const maxValue = row[2] as number;
      const adviceLink = row[3] as string;

      if (!adviceLinks[type]) {
        adviceLinks[type] = {};
      }

      // Save advice in adviceLinks object
      adviceLinks[type][`${minValue}-${maxValue}`] = adviceLink;
    });
  }
  // Function to get the advice in the list with the value and the type
  public getAdviceLinks(type: string, value: number): string[] {
    const sensorAdvice = adviceLinks[type];
    const adviceList: string[] = [];
    if (!sensorAdvice) {
      return adviceList; 
    }

    for (const range in sensorAdvice) {
      const [min, max] = range.split('-').map(Number);
      if (+value >= min && +value <= max) {
        adviceList.push(sensorAdvice[range]); 
      }
    }

    return adviceList;
  }  
}

// (Fisher-Yates Shuffle) for random HATEOAS links
export async function shuffleArray(array: SensorEntity[]): Promise<any> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to create the HATEOAS links
export async function createHateoasLinks(sensor: SensorEntity): Promise<any> {
  return {
    self: {
      href: `/sensors/${sensor.name}`,
      method: 'GET',
    },
    update: {
      href: `/sensors/${sensor.name}`,
      method: 'PUT',
    },
    delete: {
      href: `/sensors/${sensor.name}`,
      method: 'DELETE',
    },
    type: {
      href: `/sensors/`,
      params: `${sensor.type}`,
      method: 'GET',
    },
    location: {
      href: `/sensors/`,
      params: `${sensor.location}`,
      method: 'GET',
    },
  };
}

// Function to add other HATEOAS links in existing links
export async function addRandomHateoasLinks(sensor: SensorEntity): Promise<any> {
  const sensors = await this.getAllSensors();

  const shuffledSensors = this.shuffleArray(sensors);

  const selectedSensors = shuffledSensors.slice(0, 5);

  return selectedSensors.map(sensor => this.createHateoasLinks(sensor));
}

// Function to return HATEOAS links (construction of the HTTP response)
export async function addHateoasLinks(sensor: SensorEntity): Promise<any> {
  if (!globalSensorUtils) {
    globalSensorUtils = new SensorUtils();
    await globalSensorUtils.loadSensorAdviceFromExcel();
  }
  const baseLinks = {
    self: {
      href: `/sensors/${sensor.name}`,
      method: 'GET',
    },
    update: {
      href: `/sensors/${sensor.name}`,
      method: 'PUT',
    },
    delete: {
      href: `/sensors/${sensor.name}`,
      method: 'DELETE',
    },
    type: {
      href: `/sensors/`,
      params: `${sensor.type}`,
      method: 'GET',
    },
    location: {
      href: `/sensors/`,
      params: `${sensor.location}`,
      method: 'GET',
    },
  };
  
  const firstData = sensor.data && sensor.data.length > 0 ? sensor.data[0] : null;
  const sensorUtils = new SensorUtils(); 
  await sensorUtils.loadSensorAdviceFromExcel(); 
  const adviceLinks = firstData ? sensorUtils.getAdviceLinks(sensor.type, firstData.value): [];
  let adviceLinksForSensor = {};
  
  if (adviceLinks.length > 0) {
    adviceLinksForSensor = {
      advice: adviceLinks.map(link => ({ href: link, method: 'GET' })),
    };
  }

  return {
    ...sensor,
    _links: {
      ...baseLinks,
      ...adviceLinksForSensor,
    },
  };
}
