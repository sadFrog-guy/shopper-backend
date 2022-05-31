const {Brand} = require('../models/models')

class brandController {
    async create(req, res) {
        const {brand} = req.body
        const newBrand = await Brand.create({brand})
        return res.json(newBrand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getOne(req, res) {
        const {id} = req.query
        const brand = await Brand.findOne({
            where: id
        })
        return res.json(brand)
    }
}

module.exports = new brandController()