import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    image:{type:String, required:true},
    brand:{type:String, required:true},
},{timestamps:true,});

const Carousel = mongoose.model('Carousel',carouselSchema);
export default Carousel;
