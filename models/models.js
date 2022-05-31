const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING(1300), allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    gender: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    picture: {type: DataTypes.STRING}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    type: {type: DataTypes.STRING, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    brand: {type: DataTypes.STRING, allowNull: false}
})

const BrandType = sequelize.define('brand_type', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

// Basket.hasMany(BasketProduct)
// BasketProduct.belongsTo(Basket)

// BasketProduct.hasOne(Product)
// Product.belongsTo(BasketProduct)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Brand.belongsToMany(Type, {through: BrandType})
Type.belongsToMany(Brand, {through: BrandType})

module.exports = {
    Brand, BrandType, Type, User, Product
}