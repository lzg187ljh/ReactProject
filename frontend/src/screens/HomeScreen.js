import React, { useEffect } from 'react';
import Product from "../components/Product";
import LoadingBox from '../components/MessageBox';
import MessageBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen(){
  //using this hook to dispatch any redux action
    const dispatch = useDispatch();
  //userSelector access state as a function which return state.productList
    const productList = useSelector((state) => state.productList);
    const {loading,error,products} = productList;
    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch]);
    return(
        <div>
          {loading? (<LoadingBox></LoadingBox>)
                  : error? (<MessageBox variant="danger">{error}</MessageBox>)
                  : (
                      <div className="row center">
                        {
                          products.map((product) =>(
                            <Product key = {product._id} product = {product}></Product>
                          ))
                        }
                      </div>
                  )
          }      
        </div>
    );
}