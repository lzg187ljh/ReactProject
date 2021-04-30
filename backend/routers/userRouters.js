import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

// async is required in Mongoose
// use AsyncHandler to show error in page, all error will be 
// redirect to app.use(err,req) in server.js
userRouter.get('/seed', 
    expressAsyncHandler(async(req,res) => {
        //await User.remove({});
        const createdUsers = await User.insertMany(data.users);
        res.send({createdUsers});
    })
);

export default userRouter;