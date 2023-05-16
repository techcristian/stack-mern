/*import express from 'express';
import morgan from "morgan";
import path from 'path';
import fileUpload from 'express-fileupload';
import postsRoutes from './routes/posts.routes.js';
import {dirname} from "path";
import { fileURLToPath } from 'url';

//initialization app
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    tempFileDir:'./upload',
    useTempFiles: true
}));

// deploy 
app.use(express.static(path.join(__dirname, "../client/build")))

  

//routes
app.use( postsRoutes)

export { app };*/
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';
import postsRoutes from './routes/posts.routes.js';

// Initialization app
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    tempFileDir: './upload',
    useTempFiles: true
  })
);

// Deploy
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

// Routes
app.use(postsRoutes);

export { app };
