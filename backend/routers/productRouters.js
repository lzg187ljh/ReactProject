import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAdmin, isAuth} from '../utils.js'

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
        // await converts a promise to real data
        // The req.params object captures data based on the parameter specified in the URL.
        const product = await Product.findById(req.params.id);
        if(product){
            res.send(product);
        }else{
            res.status(404).send({message: 'Product Not Found'});
        }
    })
);


productRouter.post('/',isAuth,isAdmin,
    expressAsyncHandler(async(req, res) => {
        const product = new Product({
            name: 'sample name' + Date.now(),
            image: '/images/p1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
        });
        const createdProduct = await product.save();
        res.send({message:'Product Created', product:createdProduct});
    })
)

productRouter.put('/:id',isAuth,isAdmin,
    expressAsyncHandler(async(req,res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.brand = req.body.brand;
            product.description = req.body.description;
            const updatedProduct = await product.save();
            res.send({message:'Product Created', product: updatedProduct});
        }else{
            res.status(404).send({message: 'Product Not Found'});
        }
    })
)

productRouter.delete('/:id',isAuth,isAdmin,
    expressAsyncHandler(async(req,res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            const deleteProduct = await product.remove();
            res.send({message:'Product Deleted', product: deleteProduct});
        }else{
            res.status(404).send({message: 'Product Not Found'});
        }
    })
);

export default productRouter;