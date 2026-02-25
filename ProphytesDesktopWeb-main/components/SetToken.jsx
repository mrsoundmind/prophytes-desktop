import { setReduxToken } from '@/src/redux/slices/userSlice';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function SetToken() {
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if(Cookies.get("__token") || localStorage.getItem("token")){
            setToken(Cookies.get("__token") || localStorage.getItem("token"));
        }
    })

    useEffect(() => {
        dispatch(setReduxToken(token));
    }, [token])

  return null
}
