#!/usr/bin/env node

// External modules
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');

// Internal modules
const handleLoad = require('./components/handleLoad');
const log = console.log;

const argv = yargs(hideBin(process.argv))
    .scriptName('extractomundo')
    .command({
        command: 'url [url]',
        aliases: ['u'],
        desc: 'Current url from which links will be extracted.',
        builder: (yargs) => yargs.default('url', undefined),
        handler: (argv) => { }
    })
    .command({
        command: 'html [htmlFile]',
        aliases: ['h'],
        desc: 'Html file to process. Must be within the html folder.',
        builder: (yargs) => yargs.default('htmlFile', undefined),
        handler: (argv) => { }
    })
    .options({
        path: {
            alias: 'p',
            describe: 'Path to file from which to download. [Required in cli mode]',
            type: 'string',
        },
        selector: {
            alias: 's',
            describe: 'CSS3 selector rule for selecting links from page. [Required in cli mode]',
            type: 'string',
        },
        range: {
            alias: 'r',
            describe: 'Range to download links from.',
            type: 'array',
        },
        increment: {
            alias: 'i',
            describe: 'The number of files to be downloaded at any given time. Defaults to 10.',
            type: 'number',
        },
        append: {
            alias: 'a',
            describe: 'String to append at the end of every url.',
            type: 'string',
        }
    })
    .help()
    .version('1.0.0')
    .wrap(120)
    .argv

try {
    if(argv.url && argv.path && argv.selector) handleLoad(argv);
    else throw new Error('Missing/invalid arguments');
} catch (error) {
    log(chalk.red(error.message));
}