import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    useEffect(()=>{
        dispatch(detailsUser(userInfo._id));
    },[dispatch, userInfo._id]);
    return (
        <div>
            
        </div>
    );
}

export default ProfileScreen;