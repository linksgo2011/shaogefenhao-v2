const fs = require('fs');
const path = require('path');

const libsPath = '../src/libs';
let outputText = '';

try {
    const files = fs.readdirSync(libsPath);
    for (const file of files) {
        const filePath = path.join(libsPath, file);
        const stat = fs.statSync(path.join(filePath));
        if (stat.isDirectory()) {
            console.log('Scanned folder:' + file);
            outputText = outputText + '## ' + file.toUpperCase() + '\r\n';
            const subLevelFiles = fs.readdirSync(filePath);
            for (const subLevelFile of subLevelFiles) {
                console.log('Scanned file:' + subLevelFile);
                const subFileStat = fs.statSync(path.join(filePath, subLevelFile));
                if (subFileStat.isFile() && subLevelFile.indexOf('.md') !== -1) {
                    const generatedUrl = './' + file + '/' + subLevelFile.replace('.md', '.html');
                    const pageName = extractFileTitle(path.join(filePath, subLevelFile));
                    outputText = outputText + `- [${pageName}](${generatedUrl})` + '\r\n';
                }
            }
        }
    }
} catch (e) {
    console.error("We've thrown! Whoops!", e);
}

function extractFileTitle(path) {
    try {
        const text = fs.readFileSync(path, {encoding: 'utf8'});
        const lines = text.split('\n');
        return lines[1].replace('title: ', '');
    } catch (e) {
        console.error("Can't open file", e);
    }
}

console.log(outputText);
