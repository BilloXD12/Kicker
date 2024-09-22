const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

// Function to read data from the JSON file
function readData() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return data ? JSON.parse(data) : {}; // Return an empty object if data is empty
    } catch (error) {
        console.error(`Failed to read data: ${error}`);
        return {}; // Return an empty object on error
    }
}

// Function to write data to the JSON file
function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        console.log('Data written successfully');
    } catch (error) {
        console.error(`Failed to write data: ${error}`);
    }
}

module.exports = {
    readData,
    writeData,
};
