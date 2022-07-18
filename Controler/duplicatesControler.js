const Fs = require('fs')
const CsvReadableStream = require('csv-reader')
const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

exports.index = async (req, res) => {
   res.render('index', { title: 'Select an action', active: 'index' })
}

exports.duplicates = async (req, res) => {
   res.render('dupl/duplicates', { title: 'CSV', active: 'main' })
}

exports.csvDuplicates = async (req, res) => {

   if (!req.files) {
      res.send('<h1>Файл не загружен</h1>')
   } else {
      const file = req.files.file

      file.mv(path.join(__dirname, '..', 'data') + "/" + 'data.csv', function (err) {
         
         if (err) res.status(500).send(err)

         if (req.files.file.mimetype !== 'text/csv') res.send('<h1>Необходимо загрузить CSV файл</h1>')
         else {
            const users = []

            let inputStream = Fs.createReadStream(path.join(__dirname, '..', 'data', 'data.csv'), 'utf8')

            inputStream
               .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
               .on('data', function (row) {
                  users.push({name: row[0], orig: row[1]})
               })
               .on('end', function () {
                  const newArray = users.reduce((o, i) => {
                     if (!o.find(v => v.name == i.name)) {
                       o.push(i)
                     }
                     return o
                   }, [])                

                  const csvWriter = createCsvWriter({
                     path: path.join(__dirname, '..', 'data', 'data.csv'),
                     header: [
                        { id: 'orig', title: 'Orig' },
                        { id: 'name', title: 'NAME' }
                     ]
                  })
                 
                  csvWriter.writeRecords(newArray)   
                     .then(() => {
                         console.log('...Done');
                     });
                  res.render('dupl/resoult', { title: 'CSV', active: 'main', resoult: newArray.length})
               })
         }  
      })}
}

exports.download =  async (req, res) => res.download(path.join('./data', 'data.csv'))
