import { faker } from '@faker-js/faker';
import fs from 'fs';
import { EventTypeT, GeneratingEventI } from '../ifc';
import dayjs from 'dayjs';

export class EventGenerator {
    result: GeneratingEventI[] = [];
    faker = faker;

    fGenerateEvents(from: string | number | Date, to: string | number | Date) {
        const randomType = [
            ...Object.keys(EventTypeT),
            this.faker.lorem.word(7),
        ];
        const randomPlace = [
            'zoom',
            'telergam',
            'sdfgsdfgsdfgsd',
            'itioepofmr',
            'sdoifjnrnkf',
        ];
        const members = (): string[] => {
            const resultMembers: string[] = [];
            for (let i = 0; i < this.fGetRandomNumber(0, 10); i++) {
                resultMembers.push(this.faker.name.fullName());
            }
            return resultMembers;
        };

        for (let i = 0; i < this.fGetRandomNumber(10, 100); i++) {
            this.result.push({
                date: dayjs(this.faker.date.between(from, to)).format(),
                type: randomType[this.fGetRandomNumber(0, randomType.length)],
                members: members(),
                name: this.faker.name.jobTitle(),
                place: randomPlace[
                    this.fGetRandomNumber(0, randomPlace.length)
                ],
            });
        }
        fs.openSync('generating.json', 'w');
        fs.writeFileSync(
            'generating.json',
            JSON.stringify({ events: this.result })
        );
    }

    fGetRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const generator = new EventGenerator();
export { generator };

generator.fGenerateEvents('01-04-2023', '08-04-2023');
