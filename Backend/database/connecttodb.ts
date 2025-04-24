import Category from '../Model/categoryModel';
import OrderDetails from '../Model/orderDetails';
import Order from '../Model/orderModel';
import Payment from '../Model/paymentModel';
import Product from '../Model/productModel';
import User from '../Model/userModel';
import { envConfig } from './../config/envConfig';
import { Sequelize } from "sequelize-typescript";


const sequalize = new Sequelize(`${envConfig.db}`, {
    models: [User,
        Product,
        Category,
        Order,
        OrderDetails,
        Payment,

    ],//just add comma and add the no if tables
})

// const sequalize = new Sequelize(envConfig.db as string,{
//     models : [__dirname + './Model']
// })
try {
    sequalize.authenticate().then(() => {
        console.log("connected  to sequalize")


    }).catch(err => {
        console.log('not connected ', err)
    })


} catch (error) {
    console.log(error);
}
sequalize.sync({ force: false, alter: false }).then(() => {
    console.log("synced !!")
})//wo this also run hai ta


//relationship 
//between product and category 
Product.belongsTo(Category, { foreignKey: "categoryId" })
Category.hasMany(Product, { foreignKey: "categoryId" })

// user and order
Order.belongsTo(User, { foreignKey: "userId" })
User.hasMany(Order, { foreignKey: "userId" })

//between product and order
Product.hasMany(OrderDetails, { foreignKey: "productId" })
OrderDetails.belongsTo(Product, { foreignKey: "productId" })

//betweem order and order detail 
OrderDetails.belongsTo(Order, { foreignKey: "orderId" })
Order.hasOne(OrderDetails, { foreignKey: "orderId" })

//between order and payment
Payment.belongsTo(Order, { foreignKey: "orderId" })
Order.hasOne(Payment, { foreignKey: "orderId" })



export default sequalize;  
