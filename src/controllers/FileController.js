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
}

module.exports = new FileController()