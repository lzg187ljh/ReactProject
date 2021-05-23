import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressScreen(props) {
    const dispatch = useDispatch();
    
    // if user sign out, this page should be redirect to signin page 
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo){
        props.history.push('/signin');
    }

    // set initial cart value to form
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [fullName,setFullName] = useState(shippingAddress.fullName);
    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
    const [country,setCountry] = useState(shippingAddress.country);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Enter full name" required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Enter address" required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={e=>setCity(e.target.value)} placeholder="Enter city" required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">PostalCode</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={e=>setPostalCode(e.target.value)} placeholder="Enter PostalCode" required></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={country} onChange={e=>setCountry(e.target.value)} placeholder="Enter Country" required></input>
                </div>
                <div>
                    <label/>
                    <button type="submit" className="primary">Continue</button>
                </div>
            </form>
        </div>
    );
}

export default ShippingAddressScreen;