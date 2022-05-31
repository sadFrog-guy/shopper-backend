const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAll)
router.get('/last', productController.getLast)
router.get('/:id', productController.getOne)
router.post('/', productController.create)
router.put('/', productController.update)
router.delete('/:id', productController.delete)

module.exports = router