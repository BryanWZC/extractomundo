# Extractomundo

## Description
A link search and download application. Extratomundo makes downloading all specified links from a given URL or HTML file super easy. 

## Installation
```
npm i extractomundo
```

## Usage
Extractomundo comes in the following formats:
- A module to `require()`
- A Cli interface

### Example 
#### Modules
```js
// Module 
const Emundo = require('extractomundo');
const props = {
    url: 'any-url',
    htmlFile: 'any-file',
    path: '../../downloads/', // Any file path
    selector: 'div > a:first-child', // CSS3 selectors that will search for your links
    range: [0, 50], 
    increment: 10,
    append: '&raw=1', // Example for force downloading dropbox links
}
const emundo = new Emundo(props);

emundo.links().then(res =>  console.log(res))// Prints out an array of links

emundo.download() // initiate file(s) download;
```
#### CLI
```
>>> extractomundo --help

extractomundo [command]

Commands:
  extractomundo url [url]        Current url from which links will be extracted.                            [aliases: u]
  extractomundo html [htmlFile]  Html file to process. Must be within the html folder.                      [aliases: h]

Options:
  -p, --path       Path to file from which to download. [Required in cli mode]                                  [string]
  -s, --selector   CSS3 selector rule for selecting links from page. [Required in cli mode]                     [string]
  -r, --range      Range to download links from.                                                                 [array]
  -i, --increment  The number of files to be downloaded at any given time. Defaults to 10.                      [number]
  -a, --append     String to append at the end of every url.                                                    [string]
      --help       Show help                                                                                   [boolean]
      --version    Show version number                                                                         [boolean]
```

## API
### props
Props define what and how the links are to be parsed and downloaded. There are 6 props that you need to take note of:
| Props     | Definition                                                                                                                                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url       | Current url from which links will be extracted.                                                                                                                                                                                                                    |
| htmlFile  | Html file to process. You **must** create a `html` folder within the root directory and add your html files there. For this field, just add the name of your html file and not including its path. **Specifying a htmlFile will take priority over the url field** |
| path      | Path to file from which to download.                                                                                                                                                                                                                               |
| selector  | CSS3 selector rule for selecting links from page.                                                                                                                                                                                                                  |
| range     | Range to download links from. (Eg. [10,20] downloads links from index 10 to 20)                                                                                                                                                                                    |
| increment | The number of files to be downloaded at any given time. Defaults to 10.                                                                                                                                                                                            |
| append    | String to append at the end of every url.                                                                                                                                                                                                                          |

### .links()
The link method returns an array of links from the url or html file.

### .download()
The download method initiates the download sequence. See console for progress.