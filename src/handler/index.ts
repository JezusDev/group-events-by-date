import fs from 'fs';
import path from 'path';
import { EventI, EventTypeT } from '../ifc';
import dayjs from 'dayjs';
var _ = require('lodash');

export class EventHandler {
    private data: EventI[] = [];
    result: Record<string, EventI[]> = {};

    public fGroupEventsByDate(pathToJSON: string) {
        try {
            this.fGetDataFromJson(pathToJSON);
            this.fGetResult(this.data);
        } catch (error) {
            console.log('Что-то пошло не так');
        }
    }

    private fGetResult(data: EventI[]) {
        const aValidEvent = this.fGetValidData(data);
        for (let i = 0; i < aValidEvent.length; i++) {
            const vEvent = aValidEvent[i];
            const dateKey = vEvent.date.slice(0, 10);
            if (this.result[dateKey]) {
                this.result[dateKey].push(vEvent);
            } else {
                this.result[dateKey] = [];
                this.result[dateKey].push(vEvent);
            }
        }
        this.result = this.fSortResult(this.result);
        fs.openSync('result.json', 'w');
        fs.writeFileSync('result.json', JSON.stringify(this.result));
    }

    private fSortResult(result: Record<string, EventI[]>) {
        for (let key in result) {
            result[key].sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);
                return aDate.getTime() - bDate.getTime();
            });
        }
        return result;
    }

    private fGetValidData(data: EventI[]): EventI[] {
        const aValidEvent: EventI[] = [];

        for (let i = 0; i < data.length; i++) {
            const vEvent = this.fValidEvent(data[i]);
            if (vEvent) {
                aValidEvent.push(vEvent);
            }
        }
        return aValidEvent;
    }

    private fGetDataFromJson(pathToJSON: string) {
        try {
            const JSONData = fs.readFileSync(pathToJSON, 'utf-8');
            console.log(JSONData);
            this.data = JSON.parse(JSONData)['events'];
            console.log(this.data, 'Есть контакт');
        } catch (error) {
            console.log(error);
        }
    }

    private fValidType(type: EventTypeT) {
        try {
            if (type === EventTypeT.other) {
                return false;
            }
            if (!EventTypeT[type]) {
                throw Error(`Такого типа события не существует: ${type}`);
            }
            return type;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

    private fValidEvent(vEvent: EventI): EventI | void {
        if (
            this.fValidDate(vEvent.date) &&
            this.fValidName(vEvent.name) &&
            this.fValidType(vEvent.type)
        ) {
            const validDate = this.fValidDate(vEvent.date);
            const validEvent: EventI = {
                ...vEvent,
                date: validDate,
            };
            return validEvent;
        }
    }

    private fValidDate(date: string) {
        return dayjs(date).format('DD-MM-YYYY HH:MM');
    }

    private fValidName(name: string) {
        try {
            if (name.length > 100) {
                throw Error('Слишком длинная строка.');
            }
            const aNames = name.split(' ');
            const aErrorNames = aNames.filter((name) => name.length > 20);
            if (aErrorNames.length) {
                throw new Error('Одно из слов слишком длинное.');
            }
            return name;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }
}

const handler = new EventHandler();
export { handler };
