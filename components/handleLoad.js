// External modules
const chalk = require('chalk');

// Internal modules
const downloadAllLinks = require('./downloadAll');
const extractLinks = require('./extract');
const log = console.log;

// Internal modules - built-in
const EventEmitter = require('events');

class Emitter extends EventEmitter {
    async execute(props) {
        let { path, range, increment } = props;
        let count = 0;
        let finish;
        log(chalk.green('Download Start'));

        if(!props.increment) increment = 10;
        if(Array.isArray(range) && range.length < 3) count = range[0], finish = range[1];

        const linksArr = await extractLinks(props);

        log(chalk.green(`Total Links: ${linksArr.length}`))
        while(count < (finish || linksArr.length)) {
            log(chalk.green(`Downloading: ${count} - ${count + increment < linksArr.length ? count + 10 : linksArr.length}...`))
            await downloadAllLinks(linksArr.slice(count, count + increment), path);
            count += increment;
        }
    }
}

const emitter = new Emitter();

async function handleLoad(props) {
    // Validation
    if(!props.url || !props.path || !props.selector) throw new Error('Empty fields detected');
    if(typeof(props.range) === 'string') {
        const match = props.range.match(/\[\s*\d+\s*\,\s*\d+\s*\]/);
        if(!match) throw new Error('Wrong range input');
        props.range = JSON.parse(match);
    }

    await emitter.execute(props);
}

module.exports = handleLoad;