const rootFolderPath = 'src/libs';

const fs = require('fs');
const path = require('path');

function extractTitle(filePath) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    // Assuming the title is on the second line, formatted as "title: Your Title Here"
    const titleLine = lines[1] || ''; // Get the second line or return an empty string if it doesn't exist
    const titleMatch = titleLine.match(/^title:\s*(.*)$/);
    return titleMatch ? titleMatch[1].trim() : 'Untitled';
}

// Function to generate home page content from markdown files within two levels of folders
function generateHomePage() {
    let content = '# Home Page\n\n';

    // Read items from the root folder
    const items = fs.readdirSync(rootFolderPath);

    items.forEach(item => {
        const fullPath = path.join(rootFolderPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            content += `## ${item} \n`
            // If the item is a directory, read its contents (second level)
            const subItems = fs.readdirSync(fullPath);
            subItems.forEach(subItem => {
                if (subItem.endsWith('.md') && subItem !== 'README.md') {
                    // Generate a link for each markdown file in the subdirectory
                    const filePath = path.join(rootFolderPath,item, subItem);
                    const title = extractTitle(filePath);
                    content += `- [${title}](${path.join(item, subItem)})\n`;
                }
            });
        } else if (item.endsWith('.md') && item !== 'README.md') {
            // Generate a link for each markdown file in the root directory
            const title = item.replace('.md', '');
            content += `- [${title}](${item})\n`;
        }
    });

    // Update the README.md file or another target file with the generated content
    fs.writeFileSync(path.join(rootFolderPath, 'README.md'), content);
}

generateHomePage();
