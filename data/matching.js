const fs = require('fs');

// Read the JSON files
let data1 = fs.readFileSync('combined.json', 'utf8');
let data2 = fs.readFileSync('merged-new.json', 'utf8');

// Parse the JSON files
let obj1 = JSON.parse(data1);
let obj2 = JSON.parse(data2);

// Access the 'data' arrays within the JSON objects
let arr1 = obj1.data;
let arr2 = obj2.data;

// Ensure arr1 and arr2 are arrays
if (!Array.isArray(arr1)) {
    console.error('arr1 is not an array. Please check the structure of file1.json');
    process.exit(1);
}
if (!Array.isArray(arr2)) {
    console.error('arr2 is not an array. Please check the structure of file2.json');
    process.exit(1);
}

// Extract IDs from each array
let ids1 = new Set(arr1.map(item => item.id));
let ids2 = new Set(arr2.map(item => item.id));

// Find IDs that are in file1 but not in file2
let diff1 = [...ids1].filter(id => !ids2.has(id));

// Find IDs that are in file2 but not in file1
let diff2 = [...ids2].filter(id => !ids1.has(id));

// Output the IDs
if (diff1.length > 0) {
    console.log('IDs in combined but not in merged-new:', diff1);
} else {
    console.log('No IDs are unique to combined.');
}
if (diff2.length > 0) {
    console.log('IDs in merged-new but not in combined:', diff2);
} else {
    console.log('No IDs are unique to merged-new.');
}
