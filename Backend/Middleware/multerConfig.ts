import multer from "multer";
import path from "path";

// write code for multer diskstorage for file handling in storage folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage"); //cb(error,sucess)
  },
  filename: (req, file, cb) => {
    cb(null,Date.now()+" "+file.originalname);
  },
});
//export tihis function and multer
export  { multer, storage };

