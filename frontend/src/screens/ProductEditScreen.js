import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProducts, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props){
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading,error,product} = productDetails;

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [image,setImage] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock,setCountInStock] = useState('');
    const [brand,setBrand] = useState('');
    const [description,setDescription] = useState('');

    const productId = props.match.params.id;

    const productUpdate = useSelector(state => state.productUpdate);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = productUpdate;

    useEffect(()=>{
        if(successUpdate){
            props.history.push('/productList');
        }
        if(!product || (product._id !== productId) || successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET});
            dispatch(detailsProducts(productId));
        }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        };
        
    },[dispatch,product,productId,props.history,successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateProduct({
            _id:productId,
            name,price,image,category,countInStock,brand,description,
        }));
    };

    const [loadingUpload,setLoadingUpload] = useState(false);
    const [errorUpload,setErrorUpload] = useState('');

    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const uploadHandler = async(e) =>{
        const file = e.target.files[0];

        //https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData
        const bodyFormData = new FormData();
        bodyFormData.append('image',file);
        setLoadingUpload(true);
        try{
            const {data} = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            })
            setImage(data);
            setLoadingUpload(false);
        }catch(error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                    loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant="danger"></MessageBox>
                    : (
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter name" 
                                value={name} onChange={e => setName(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="price">Price</label>
                                <input id="price" type="text" placeholder="Enter price" 
                                value={price} onChange={e => setPrice(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="image">Image</label>
                                <input id="image" type="text" placeholder="Enter image" 
                                value={image} onChange={e => setImage(e.target.value)}></input>
                            </div>
                                
                            <div>
                                <lable htmlFor="imageUpload">Image Upload</lable>
                                <input id="imageUpload" type="file" label="Choose Image" onChange={uploadHandler}></input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                            </div>

                            <div>
                                <label htmlFor="category">Category</label>
                                <input id="category" type="text" placeholder="Enter category" 
                                value={category} onChange={e => setCategory(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="countInStock">CountInStock</label>
                                <input id="countInStock" type="text" placeholder="Enter countInStock" 
                                value={countInStock} onChange={e => setCountInStock(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input id="brand" type="text" placeholder="Enter brand" 
                                value={brand} onChange={e => setBrand(e.target.value)}></input>
                            </div>

                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea id="description" type="text" placeholder="Enter description" 
                                value={description} onChange={e => setDescription(e.target.value)}></textarea>

                            </div>
                            <div>
                                <label></label>
                                <button className="primary" type="submit">Update</button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
    );
};


