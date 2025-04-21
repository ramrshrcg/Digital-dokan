import Category from '../Model/categoryModel';
import Product from '../Model/productModel';
import User from '../Model/userModel';
import { envConfig } from './../config/envConfig';
import { Sequelize } from "sequelize-typescript";


const sequalize = new Sequelize(`${envConfig.db}`, {
    models: [User,
        Product,
        Category,
        
        ],//just add comma and add the no if tables
        
    


})

// const sequalize = new Sequelize(envConfig.db as string,{
//     models : [__dirname + '/Model']
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
Product .belongsTo(Category)
Category.hasMany(Product)



export default sequalize;  
