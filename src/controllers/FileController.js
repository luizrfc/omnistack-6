const File = require('../models/Files')
const Box = require('../models/Box')

class FileController {
    async store(req, res) {
        const boxId = req.params.id
        const box = await Box.findById(boxId)
        console.log(req.file)

        const file = await File.create({
            title: (req.body.title) ? req.body.title : req.file.originalname,
            original: req.file.originalname,
            path: req.file.key
        })

        box.files.push(file)

        await box.save()

        req.io.sockets.in(box._id).emit('file', file)

        return res.json(file)
    }

    async remove(req, res) {
        const fileId = req.params.id
        let indexFile = 0
        await File.remove({ _id: fileId })
        let box = await Box.find({ files: fileId })
        box.map((file,index) => {
            if(file === fileId) indexFile = index
        })
        box.splice(indexFile, 1)
        const resultBox = await Box.update({ _id: box._id}, box)

        return res.json({ message: 'Registro removido com sucesso', box, resultBox })
    }
}

module.exports = new FileController()