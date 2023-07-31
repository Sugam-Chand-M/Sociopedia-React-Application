import express from "express"; // Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
import bodyParser from "body-parser"; // Node.js body parsing middleware.Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import mongoose from "mongoose"; // 
import cors from "cors"; // Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain
import dotenv from "dotenv"; // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
import multer from "multer"; // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
import helmet from "helmet"; // Helmet helps secure Express apps by setting HTTP response headers
import morgan from "morgan"; // HTTP request logger middleware for node.js.
import path from "path"; // The Path module provides a way of working with directories and file paths
import { fileURLToPath } from "url"; // The URL interface is used to parse, construct, normalize, and encode URLs
import { error, log } from "console";
import authRoutes from "./routes/auth.js"; // routes folder for the path and routes for every type of features i.e., in this case is auth feature
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

// Configurations for Middleware
const fileName=fileURLToPath(import.meta.url);
const dirName=path.dirname(fileName);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(dirName,'public/assets'))); // sets up a directory where we keep/store our assets i.e., the images we use/store in local

// File storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){ // if someone uploads a file to your website it's gonna store it in the assets folder
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload=multer({storage});

// Routes with Files
app.post("/auth/register",upload.single("picture"),register);

// Routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes);

// Mongoose setup
const PORT=process.env.PORT || 6001; // 6001 added in case 3001 doesn't work
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Port: ${PORT}`));
}).catch((error)=>console.log(`${error} did not connect`));