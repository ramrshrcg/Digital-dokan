import { envConfig } from "./config/envConfig";
import app from "./src/app";


function server(){
const port = envConfig.port||3844
app.listen(port ,()=>
{
    console.log(`server is running om port ${port}` );
    
})
}

server()