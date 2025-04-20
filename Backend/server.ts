import adminSeeder from "./adminSeeder";
import { envConfig } from "./config/envConfig";
import categoryController from "./Controller/categoryController";
import app from "./src/app";


function server(){
const port = envConfig.port||5000
app.listen(port ,()=>
{
    adminSeeder();
    categoryController.seedCategories();
    console.log(`server is running om port ${port}` );
    
})
}

server()