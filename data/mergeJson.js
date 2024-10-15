const fs = require('fs');
const path = require('path');

// List of JSON file paths
const files = [
    '1.json',
    '2.json',
    '3.json',
    '4.json',
    '5.json',
    '6.json',
    '7.json',
    '8.json'
];

// Function to merge all JSON files into one
function mergeJsonFiles(files) {
    let mergedData = {
        draw: 1,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: [],
        disableOrdering: false
    };

    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Merge data
        mergedData.data.push(...fileData.data);
        mergedData.recordsTotal += fileData.recordsTotal;
        mergedData.recordsFiltered += fileData.recordsFiltered;
    });

    // Increment the draw value based on the number of files
    mergedData.draw = files.length;

    return mergedData;
}

// Merge the files
const mergedJson = mergeJsonFiles(files);

// Save the merged result to a new JSON file
fs.writeFileSync('merged-new.json', JSON.stringify(mergedJson, null, 2), 'utf8');

console.log('Merged JSON saved to merged-new.json');
