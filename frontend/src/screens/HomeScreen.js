import React, { useEffect } from 'react';
import Product from "../components/Product";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listCarousels } from '../actions/carouselActions';

export default function HomeScreen(){
  //using this hook to dispatch any redux action
    const dispatch = useDispatch();
  //userSelector access state as a function which return state.productList
    const productList = useSelector((state) => state.productList);
    const {loading,error,products} = productList;

    const carouselList = useSelector((state) => state.carouselList);
    const {loading:loadingCarousel,error:errorCarousel,carousels} = carouselList;
    useEffect(()=>{
        dispatch(listProducts());
        dispatch(listCarousels());
    },[dispatch]);

    const shopNowHandler = (id) =>{
      //props.history.push('#');
    };
    return(
        <div>
          {loadingCarousel? (<LoadingBox></LoadingBox>)
                  : errorCarousel? (<MessageBox variant="danger">{error}</MessageBox>)
                  : (
                      <Carousel showArrows  showThumbs={false}>
                        {
                          carousels.map(carousel => (
                            <div key={carousel._id}>
                              <img src={carousel.image} alt={carousel.name} />
                                <button className="carouselButton" type="button" onClick={() => shopNowHandler(carousel.name)}>
                                  Shop Now
                                </button>         
                            </div>
                          ))
                        }
                      </Carousel>
                  )
          }
          
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