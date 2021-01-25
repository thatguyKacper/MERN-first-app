import path from 'path'
import express from 'express'
import template from './../template'
import {MongoClient} from 'mongodb'
//comment out before building for production
import devBundle from './devBundle'

const app = express()
//comment out before building for production
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200). send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
  if(err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/firstMernProject'
MongoClient.connect(url, (err, db) => {
  console.log('Connected successfully to mongodb server')
  db.close()
})