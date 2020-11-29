// External modules
const axios = require('axios');
const chalk = require('chalk');

// Internal modules
const createTitle = require('./createTitle');
const fs = require('fs');
const log = console.log;

// Constants
let DOWNLOADS = 0;
let COMPLETED = 0;
const timeStart = new Date().getTime();

/**
 * Downloads a link to a file in the download folder specified in the path
 * @param {String} url   Current url string
 * @param {String} path  Path to download folder (optional). If none given, will default to '../downloads/' folder
 */
async function downloadFile(url, path) {
    await axios({
        method: 'get',
        'url': url,
        responseType: 'stream'
    }).then(res => {
        const writable = fs.createWriteStream(path);
        res.data.pipe(writable);
        writable.on('finish', () => {
            const timeElapse = getTimeElapse();
            COMPLETED++;

            log(chalk.magenta(`${COMPLETED}/${DOWNLOADS} COMPLETED --- ${timeElapse} secs`));
            log(res.config.url);
            if(COMPLETED === DOWNLOADS) log(chalk.green('Download Completed!'));
        });

    }).catch(err => log(chalk.red(err)))
}

/**
 * Downloads all links from the array of links to download path specified
 * @param {Array} links  Array of links to process and download
 * @param {String} path  Path to download folder (optional). If none given, will default to '../downloads/' folder
 */
async function downloadAllLinks(links, path) {
    if(!path) path = '../downloads/';
    links.map(async (url) => {
        const title = createTitle(url, DOWNLOADS);
        await downloadFile(url, `${path}${title}`);

        const timeElapse = getTimeElapse();
        log(chalk.cyan(`DOWNLOADING: ${title} --- ${timeElapse} secs`));
        DOWNLOADS++;
        return links.length;
    });
}

function getTimeElapse() {
    const timeEnd = new Date().getTime();
    const timeElapse = (timeEnd - timeStart) / 1000;
    return timeElapse;
}

module.exports = downloadAllLinks;