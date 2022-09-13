const xlsx = require('xlsx')
const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

exports.jsonToCsv  = (data) => {

    const csvWriter = createCsvWriter({
        path: path.join(__dirname, '..', 'data', 'data.csv'),
        header: [
           { id: 'key', title: 'key' },
           { id: 'grade', title: 'grade' }
        ]
     })
    
     csvWriter.writeRecords(data)   
        .then(() => {
            console.log('...Done');
        });
}

exports.convertJsonToExsel = async (data) => {

    const workSheet = xlsx.utils.json_to_sheet(data)
    const workBook = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(workBook, workSheet, 'data')

    xlsx.write(workBook, {bookType: 'xlsx', type: 'buffer'})

    xlsx.write(workBook, {bookType: 'xlsx', type: "binary"})
    
    const fileName = `sheet-data-result.xlsx`

    await xlsx.writeFile(workBook, path.join(__dirname, '..', 'data', fileName))

    return fileName
}
