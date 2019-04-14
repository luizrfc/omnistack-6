const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

routes.post('/boxes', BoxController.store)
routes.get('/boxes/all', BoxController.showAll)
routes.get('/boxes/:id', BoxController.show)
routes.delete('/boxes/:id', BoxController.remove)

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store)
routes.delete('/files/:id', FileController.remove)

module.exports = routes