import React, { useEffect } from 'react'
import { UserAuth } from '../../auth/AuthContext';
 import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Login() {
  const {googleSignIn, user} = UserAuth();
  const navigate = useNavigate()
  const handleGoogleSignIn = async()=>{
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    if(user!=null){
      navigate('/home')
    }
  },[user])
  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleGoogleSignIn} > Log In </Button>
    </div>
  )
}
