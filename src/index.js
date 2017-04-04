"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debugFn = require("debug");
const opn = require("opn");
const path = require("path");
const program = require("commander");
const Server_1 = require("./Server");
const Printer_1 = require("./Printer");
const Resolver_1 = require("./Resolver");
const debug = debugFn('kc:index');
program
    .version(require('../package.json').version);
program
    .command('serve [dir]')
    .description('serve presentation')
    .option('-p, --port <port>', 'serve presentation on specified port')
    .option('-o, --open', 'open presentation in a browser')
    .action((dir, options) => __awaiter(this, void 0, void 0, function* () {
    debug('dir: ', dir);
    debug('options: ', options);
    var cwd = dir || path.join(process.cwd());
    var r = new Resolver_1.Resolver(cwd);
    var data = {
        title: path.basename(process.cwd()),
        slides: yield r.slides(),
        css: r.css(),
        server: {}
    };
    const url = yield new Server_1.Server(data, {
        cwd: cwd,
        port: options.port || 3000
    }).listen();
    open(options.open, url);
}));
program
    .command('print [dir]')
    .description('print presentation')
    .action((dir) => __awaiter(this, void 0, void 0, function* () {
    var cwd = dir || process.cwd();
    var r = new Resolver_1.Resolver(cwd);
    var data = {
        title: path.basename(process.cwd()),
        slides: yield r.slides(),
        css: r.css(),
        server: {}
    };
    yield new Printer_1.Printer(data, {
        cwd: cwd,
        port: 2999
    }).print();
    console.log('Done.');
}));
program
    .command('help')
    .description('view presentation on how to create slick presentations')
    .action((cmd, options) => __awaiter(this, void 0, void 0, function* () {
    var cwd = path.join(__dirname, 'help');
    var data = {
        title: 'kc - help',
        slides: yield new Resolver_1.Resolver(cwd).slides(),
        server: {},
        css: []
    };
    const url = yield new Server_1.Server(data, {
        cwd: cwd,
        port: 3001
    }).listen();
    open(true, url);
}));
program.parse(process.argv);
function open(open, url) {
    console.log(`Presentation: ${url}`);
    if (open) {
        opn(url);
    }
}
//# sourceMappingURL=index.js.map