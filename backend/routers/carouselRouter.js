import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Carousel from '../models/carouselModel.js';

const carouselRouter = express.Router();

// async is required in Mongoose
// use AsyncHandler to show error in page, all error will be 
// redirect to app.use(err,req) in server.js
carouselRouter.get('/',
    expressAsyncHandler(async(req,res)=>{
        const carousels = await Carousel.find({});
        res.send(carousels);
    })
);


// insert data to MongoDB from data.js only
carouselRouter.get('/seed', 
    expressAsyncHandler(async(req,res) => {
        await Carousel.remove({});
        const createdCarousels = await Carousel.insertMany(data.carousels);
        res.send({createdCarousels});
    })
);

export default carouselRouter;