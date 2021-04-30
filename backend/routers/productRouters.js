import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// async is required in Mongoose
// use AsyncHandler to show error in page, all error will be 
// redirect to app.use(err,req) in server.js
productRouter.get('/',
    expressAsyncHandler(async(req,res)=>{
        const products = await Product.find({});
        res.send(products);
    })
);


// insert data to MongoDB from data.js only
productRouter.get('/seed', 
    expressAsyncHandler(async(req,res) => {
        //await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({createdProducts});
    })
);

productRouter.get('/:id',
    expressAsyncHandler(async(req,res)=>{
        // await conver a promise to real data
        const product = await Product.findById(req.params.id);
        if(product){
            res.send(product);
        }else{
            res.status(404).send({message: 'Product Not Found'});
        }
    })
)

export default productRouter;