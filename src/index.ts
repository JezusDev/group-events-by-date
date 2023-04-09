import path from 'path';
import { generator } from './generator';
import { handler } from './handler';
import { TerminalParamsI } from './ifc';
const argv = require('optimist').argv


const vArgs: TerminalParamsI = {
    from: argv.from || Date.now() - 604800000,
    to: argv.to || Date.now(),
    entry: argv.entry,
    out: argv.out ? argv.out : path.resolve(__dirname, '../test/result.json'),
}
console.log(argv)



if (!vArgs.entry) {
    vArgs.entry = path.resolve(__dirname, '../test/generating.json')
    generator.fGenerateEvents(vArgs.from, vArgs.to, path.resolve(__dirname, '../test/generating.json'));
}

handler.fGroupEventsByDate(vArgs.entry, vArgs.out);
