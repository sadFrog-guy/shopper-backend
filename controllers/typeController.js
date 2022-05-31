const {Type} = require('../models/models')

class typeController {
    async create(req, res) {
        const {type} = req.body
        const newType = await Type.create({type})
        return res.json(newType)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOne(req, res) {
        const {id} = req.query
        const type = await Type.findOne({
            where: id
        })
        return res.json(type)
    }
}

module.exports = new typeController()