const {Product} = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const {Op} = require("sequelize");

class productController {
    async getAll(req, res) {
        let {limit, page, brandId, typeId, price, gender} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products = []

        if(!brandId && !typeId && !price && !gender) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId && !price && !gender) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId && !price && !gender) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId && !price && !gender) {
            products = await Product.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        if(!brandId && !typeId && price && !gender) {
            products = await Product.findAndCountAll({where: {
                price: {
                    [Op.lt]: price
                }
            }, limit, offset})
        }
        if(!brandId && !typeId && !price && gender) {
            products = await Product.findAndCountAll({where: {gender}, limit, offset})
        }
        if(!brandId && !typeId && price && gender) {
            products = await Product.findAndCountAll({where: {
                price: {
                    [Op.lt]: price
                },
                gender
            }, limit, offset})
        }
        if(!brandId && typeId && price && gender) {
            products = await Product.findAndCountAll({where: {
                    typeId,
                    price: {
                        [Op.lt]: price
                    },
                    gender
                }, limit, offset})
        }
        if(brandId && !typeId && price && gender) {
            products = await Product.findAndCountAll({where: {
                    brandId,
                    price: {
                        [Op.lt]: price
                    },
                    gender
                }, limit, offset})
        }
        if(brandId && !typeId && !price && gender) {
            products = await Product.findAndCountAll({where: {
                    brandId,
                    gender
                }, limit, offset})
        }
        if(!brandId && typeId && price && !gender) {
            products = await Product.findAndCountAll({where: {
                    typeId,
                    price: {
                        [Op.lt]: price
                    },
                }, limit, offset})
        }
        if(brandId && !typeId && price && !gender) {
            products = await Product.findAndCountAll({where: {
                    brandId,
                    price: {
                        [Op.lt]: price
                    },
                }, limit, offset})
        }
        if(!brandId && typeId && !price && gender) {
            products = await Product.findAndCountAll({where: {
                    typeId,
                    gender
                }, limit, offset})
        }
        if(brandId && typeId && price && gender) {
            products = await Product.findAndCountAll({where: {
                brandId,
                typeId,
                price: {
                    [Op.lt]: price
                },
                gender
            }, limit, offset})
        }

        res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        return res.json(product)
    }

    async getLast(req, res) {
        const product = await Product.findOne({
            order: [['createdAt', 'DESC']],
        })
        return res.json(product)
    }

    async create(req, res, next) {
        try {
            const raw = req.body
            const {picture} = req.files
            const fileName = uuid.v4() + '.jpg'
            picture.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({...raw, picture: fileName})
            res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const product = req.body
            const updatedProduct = await Product.update(
                {...product},
                {where: {...product}}
            )
            res.json(updatedProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params

        if(!id) {
            next(ApiError.badRequest('ID is not defined'))
        }

        const deletedProduct = await Product.destroy({where: {id}})
        res.json(deletedProduct)
    }
}

module.exports = new productController()