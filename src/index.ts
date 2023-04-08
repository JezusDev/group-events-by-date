import path from 'path';
import { generator } from './generator';
import { handler } from './handler';

generator.fGenerateEvents('01-04-2023', '08-04-2023');
handler.fGroupEventsByDate(path.resolve(__dirname, '../generating.json'));
