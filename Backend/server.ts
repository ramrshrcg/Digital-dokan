import adminSeeder from "./dummy/adminSeeder";
import { envConfig } from "./config/envConfig";
import categoryController from "./Controller/categoryController";
import productController from "./Controller/productController";
import { productSeeder } from "./dummy/productsDummydata";
import app from "./src/app";


function server(){
const port = envConfig.port||5000
app.listen(port ,()=>
{
    adminSeeder();
    categoryController.seedCategories();
    productSeeder();
    console.log(`server is running om port ${port}` );
    
})
}

server()