
module.exports = (app) => {
    
    const duplicates = require('../Controler/duplicatesControler.js')
    const statements = require('../Controler/statementsControler.js')

    app.route('/download').get(duplicates.download)

    app.route('/').get(duplicates.index)
    app.route('/duplicates').get(duplicates.duplicates)
    app.route('/csv-duplicates').post(duplicates.csvDuplicates)

    app.route('/statements').get(statements.statements)
    app.route('/xlsx-statements').post(statements.xlsxStatements)  
    app.route('/xlsx-statements-result').post(statements.xlsxStatementsResolt)
}