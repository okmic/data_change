
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')

exports.csv = (headers, data) => {
    try {
        const csvWriter = createCsvWriter({
            path: path.join(__dirname, '..', 'data', 'data.csv'),
            header: headers
         })
        
         csvWriter.writeRecords(data)   
            .then(() => {
                console.log('...Done');
            });
         console.log(data)
    } catch (e) {
        return e
    }
}