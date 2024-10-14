"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorUtils = void 0;
exports.shuffleArray = shuffleArray;
exports.createHateoasLinks = createHateoasLinks;
exports.addRandomHateoasLinks = addRandomHateoasLinks;
exports.addHateoasLinks = addHateoasLinks;
const common_1 = require("@nestjs/common");
const xlsx = require("xlsx");
const path = require('path');
const fs = require('fs');
let adviceLinks = {};
let globalSensorUtils = null;
let SensorUtils = class SensorUtils {
    constructor() {
        this.loadSensorAdviceFromExcel();
    }
    async getSensorField(field) {
        return await (await this.sensorRepository.createQueryBuilder('sensor')
            .select(`sensor.${field}`)
            .distinct(true)
            .getRawMany())
            .map(item => item.sensor_type);
    }
    async loadSensorAdviceFromExcel() {
        const filePath = path.resolve(__dirname, '../../data/sensor-data.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        data.forEach(row => {
            const type = row[0];
            const minValue = row[1];
            const maxValue = row[2];
            const adviceLink = row[3];
            if (!adviceLinks[type]) {
                adviceLinks[type] = {};
            }
            adviceLinks[type][`${minValue}-${maxValue}`] = adviceLink;
        });
    }
    getAdviceLinks(type, value) {
        const sensorAdvice = adviceLinks[type];
        const adviceList = [];
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
};
exports.SensorUtils = SensorUtils;
exports.SensorUtils = SensorUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SensorUtils);
async function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
async function createHateoasLinks(sensor) {
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
async function addRandomHateoasLinks(sensor) {
    const sensors = await this.getAllSensors();
    const shuffledSensors = this.shuffleArray(sensors);
    const selectedSensors = shuffledSensors.slice(0, 5);
    return selectedSensors.map(sensor => this.createHateoasLinks(sensor));
}
async function addHateoasLinks(sensor) {
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
    const adviceLinks = firstData ? sensorUtils.getAdviceLinks(sensor.type, firstData.value) : [];
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
//# sourceMappingURL=sensor.utils.js.map