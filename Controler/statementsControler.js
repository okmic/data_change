const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

exports.statements = async (req, res) => {
   res.render('statem/statements', { title: 'XLSX', active: 'main' })
}

exports.xlsxStatements = async (req, res) => {

   if (!req.files) {
      res.send('<h1>Файл не загружен</h1>')
   } else {
      const file = req.files.file

/*if (req.files.file.mimetype !== 'application/vnd.ms-excel') res.send('<h1>Необходимо загрузить xlsx файл</h1>')*/

      file.mv(path.join(__dirname, '..', 'data') + "/" + 'current_list.xlsx', function (err) {
         
         if (err) res.status(500).send(err)

         res.render('statem/resoult', { title: 'XLSX', active: 'main'})

      })}
}

exports.xlsxStatementsResolt = async (req, res) => {

   const users = [] 

   if (!req.files) {
      res.send('<h1>Файл не загружен</h1>')
   } else {
      const file = req.files.file

/*       if (req.files.file.mimetype !== 'application/vnd.ms-excel') res.send('<h1>Необходимо загрузить xlsx файл</h1>') */

      const pathFile = path.join(__dirname, '..', 'data') + "/" + 'data.xlsx'

      file.mv(pathFile, function (err) {
         if (err) res.status(500).send(err)

         readXlsxFile(path.join(__dirname, '..', 'data') + "/" + 'current_list.xlsx').then((rows) => {
            readXlsxFile(fs.createReadStream(pathFile)).then((data) => {
                 for (let index = 0; index < data.length; index++) {
                           for (let rowsIndex = 0; rowsIndex < rows.length; rowsIndex++) {
                                    if(data[index][0] === rows[rowsIndex][0] ) {
                                       users.push({key: rows[rowsIndex][1], grade: data[index][1]})
                                    }
                           }
                } 

                
                if (users.length >= data.length) {
                  const newUsers = users.filter(item => item.grade !== "#ERROR_undefined" && item.grade !== null).reduce((o, i) => {
                     if (!o.find(v => v.key == i.key)) {
                       o.push(i)
                     }
                     return o
                   }, [])

                  const csvWriter = createCsvWriter({
                     path: path.join(__dirname, '..', 'data', 'data.csv'),
                     header: [
                        { id: 'key', title: 'key' },
                        { id: 'grade', title: 'grade' }
                     ]
                  })
                 
                  csvWriter.writeRecords(newUsers)   
                     .then(() => {
                         console.log('...Done');
                     });
                  res.send('<a href="/download">Download CSV File</a>') 
                }  
              })
           })


      })
   
   }
     

}

