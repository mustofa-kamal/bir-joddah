const fs = require('fs');

// Read the JSON files
const mergedNewData = JSON.parse(fs.readFileSync('merged-new.json', 'utf-8'));
const uniqueData = JSON.parse(fs.readFileSync('unique_data_work_1_copy.json', 'utf-8'));

// Extract the data arrays
const mergedNewRecords = mergedNewData.data;
const uniqueRecords = uniqueData.data;

// Create a Set of IDs from uniqueRecords
const uniqueIds = new Set(uniqueRecords.map(record => record.id));

// Filter out the records from mergedNewData that are not in uniqueData
const missingRecords = mergedNewRecords.filter(record => !uniqueIds.has(record.id));

// Create the new JSON structure
const file1Data = {
  draw: mergedNewData.draw,
  recordsTotal: missingRecords.length,
  recordsFiltered: missingRecords.length,
  data: missingRecords
};

// Write the new JSON file
fs.writeFileSync('file1.json', JSON.stringify(file1Data, null, 2));

console.log('Missing records written to file1.json');