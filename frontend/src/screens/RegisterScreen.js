import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo,loading,error} = userRegister;

    useEffect(()=>{
        if(userInfo){
            // if user already login, redirect page to shipping
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo]); 

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password!==confirmPassword){
            alert('Password and confirm password are not match');
        }else{
            dispatch(register(name,email,password));
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {/* ToDo: add account already exist MessageBox */}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" required>
                    </input>
                </div>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Enter password again" required>
                    </input>    
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? {'  '}
                        <Link to={`/signin/redirect=${redirect}`}>Sign-in</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterScreen;