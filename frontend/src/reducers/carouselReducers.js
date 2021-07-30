import { CAROUSEL_LIST_FAIL, CAROUSEL_LIST_REQUEST, CAROUSEL_LIST_SUCCESS } from "../constants/carouselConstants";

// default state is an empty array 
export const carouselListReducer =(state={ loading:true, carousels: []},action) =>{
    switch(action.type){
        case CAROUSEL_LIST_REQUEST:
            return {loading:true};
        case CAROUSEL_LIST_SUCCESS:
            return {loading:false, carousels:action.payload};
        case CAROUSEL_LIST_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};