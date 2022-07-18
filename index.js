const express = require('express')
const path =  require('path')

const bodyParser = require('body-parser')
const upload = require('express-fileupload')


const PORT = process.env.PORT || 7000

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'templates'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(upload())

const routes = require('./settings/routes.js')
routes(app) 

app.listen(PORT, () => console.log('server started on port: ' + PORT + ` Откройте браузер по ссылке http://localhost:${PORT}/` ))