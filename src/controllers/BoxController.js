const Box = require('../models/Box')

class BoxController {
    async store(req, res) {
        const { title } = req.body
        const box = await Box.create({ title })
        return res.json(box)
    }

    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {
                sort:{
                    createdAt: -1
                }
            }
        })
        return res.json(box)
    }

    async showAll(req, res){
        const box = await Box.find().populate({
            path: 'files',
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })
        return res.json(box)
    }

    async remove(req, res) {
        await Box.remove({ _id: req.params.id })
        return res.json({ message: 'Removido com sucesso'})
    }
}

module.exports = new BoxController()