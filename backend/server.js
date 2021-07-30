// buid server using express
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouters.js';
import userRouter from './routers/userRouters.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import carouselRouter from './routers/carouselRouter.js';

// .env must be added to .gitignore, otherwise it would be not secure
dotenv.config();

// app is express 的实例
const app = express();
// parse the body of http request, otherwise body of request can't be readed by postman
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// The "process. env" global variable is injected by the Node at runtime for your application to use 
// and it represents the state of the system environment your application is in when it starts.
// use a string as an alternative option if .env doesn't exist

// Deploy step, heroku config overwrite process.env var ***********
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// append path in userRouter to /api/users
app.use('/api/users',userRouter);
app.use('/api/uploads',uploadRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/carousels',carouselRouter);
app.use((err,req,res,next) =>{
    res.status(500).send({message: err.message});
});
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// the result return current folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/build/index.html'));
});
// app.get('/',(req,res)=>{
//     res.send('Server is Ready');
// });

// app.get('/api/orders/mine',
//     expressAsyncHandler(async(req,res) => {
//     const orders = await Order.find({});
//     res.send(orders);
//     //res.send('Server is Ready~');
// }));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
});