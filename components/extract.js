// External modules
const cheerio = require('cheerio');
const axios = require('axios');
const chalk = require('chalk');

// Internal modules - built-in
const log = console.log;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

/**
 * Extract links from html
 * @param {Object} props       Props object to get html, url or css selector data from 
 */
async function extractLinks(props) {
    const { htmlFile, url, selector, append } = props;
    const linksArr = [];
    let html;

    if(htmlFile) html = await readFile(`./html/${htmlFile}`, 'utf8')
    else html = await scrapeHTML(url);

    const $ = cheerio.load(html);
    $('body').find(selector).each((i, link) => { 
        const linkStr = $(link).attr('href');
        linksArr.push(linkStr + append);
    });

    return linksArr;
}

/**
 * Scrapes the html of a website so that the links can be extracted
 * @param {String} url Current url string  
 */
async function scrapeHTML(url) {
    const res = await axios({ method: 'get', url: url });
    log(chalk.green('Page Scrape Complete'))
    return res.data;
}

module.exports = extractLinks;