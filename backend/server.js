// buid server using express
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouters.js';
import userRouter from './routers/userRouters.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// :id is the placeholder for id
// app.get('/api/products/:id', (req,res)=>{
//     const product = data.products.find(x => x._id === req.params.id);
//     if(product){
//         res.send(product);
//     }else{
//         res.status(404).send({message:'Product not Found'});
//     }
    
// });

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use((err,req,res,next) =>{
    res.status(500).send({message: err.message});
});

app.get('/',(req,res)=>{
    res.send('Server is Ready');
});
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
});