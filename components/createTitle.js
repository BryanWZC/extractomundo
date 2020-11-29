const formats = [ 
    ".aif",".cda",".mid",".midi",".mp3",".mpa",".ogg",".wav",".wma",".wpl",".7z",".arj",".deb",".pkg",".rar",".rpm",".tar.gz",".z",".zip",".bin",".dmg",".iso",".toast",".vcd",".csv",".dat",".db",".dbf",".log",".mdb",".sav",".sql",".tar",".xml",".email",".eml",".emlx",".msg",".oft",".ost",".pst",".vcf",".apk",".bat",".bin",".cgi",".pl",".exe",".gadget",".jar",".msi",".py",".wsf",".fnt",".fon",".otf",".ttf",".ai",".bmp",".gif",".ico",".jpeg",".jpg",".png",".ps",".psd",".svg",".tif",".tiff",".asp",".aspx",".cer",".cfm",".cgi",".pl",".css",".htm",".html",".js",".jsp",".part",".php",".py",".rss",".xhtml",".key",".odp",".pps",".ppt",".pptx",".c",".cgi",".pl",".class",".cpp",".cs",".h",".java",".php",".py",".sh",".swift",".vb",".ods",".xls",".xlsm",".xlsx",".bak",".cab",".cfg",".cpl",".cur",".dll",".dmp",".drv",".icns",".ico",".ini",".lnk",".msi",".sys",".tmp",".3g2",".3gp",".avi",".flv",".h264",".m4v",".mkv",".mov",".mp4",".mpg",".mpeg",".rm",".swf",".vob",".wmv",".doc",".docx",".odt",".pdf",".rtf",".tex",".txt",".wpd"
];

/**
 * Creates a title for the file based on url, if name cannot be found, it defaults to number on the download queue
 * @param {String} url Current url string
 * @param {Number} count Current download count
 */
function createTitle(url, count) {
    let title;

    for(let i = 0; i < formats.length; i++) {
        const re = new RegExp(`[\\w\\%\\d\\-\\_\\.]+${formats[i]}`, 'i');
        const match = url.match(re);
        if(match && !title || title && match && match[0].length > title.length) title = match[0];
    }

    if(!title) title = String(count);

    title = title.replace(/(\%20)|([\-\_\%])/g,' ');
    return title;
}

module.exports = createTitle;