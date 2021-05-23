import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
    const dispatch = useDispatch();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSign = useSelector(state => state.userSignin);
    const {userInfo,loading,error} = userSign;

    useEffect(()=>{
        if(userInfo){
            // after signin ,redirect to previous page(shipping)
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo]); 

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" required>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required>
                    </input>    
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        New Customer? {'  '}
                        <Link to={`/register/redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;