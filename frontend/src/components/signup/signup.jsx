import React, { useState } from 'react'
import './signup.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

const signup = () => {
  const history=useNavigate();
  const [Inputs, setInputs] = useState({
    email : "",
    username : "",
    password : "",
  })
  const change = (e) =>{
    const {name,value} = e.target;
    setInputs({...Inputs, [name]:value})
  }
  const submit = async (e) =>{
    e.preventDefault();
    await axios.post("http://localhost:3001/api/v1/register", Inputs). then((response)=>{
      if(response.data.message === "User Already Exists"){
        toast.error(response.data.message)
      }
      else{
      setInputs({
        email : "",
      username : "",
      password : "",
      })
      history("/signin")
      toast.success(response.data.message)
    }
    })
  }
  return (
    <div className='signup'>
      <ToastContainer/>
      <div className='container'>
        <div className='row'>
            <div className='col-lg-4 column d-flex col-right justify-content-center align-items-center'>
              <h1 className='text-center sign-up-heading'>
                Sign <br/> Up
              </h1>
            </div>
            <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
              <div className='d-flex flex-column p-5 w-100'>
                <input className='p-2 my-3 input-signup'
                type='email' 
                placeholder='Enter your email'
                name='email'
                onChange={change}
                value={Inputs.email}/>

                <input className='p-2 my-3  input-signup'
                type='Username' 
                placeholder='Enter Username'
                name='username'
                onChange={change}
                value={Inputs.username}/>

                <input className='p-2 my-3 input-signup'
                type='password' 
                placeholder='Enter your password'
                name='password'
                onChange={change}
                value={Inputs.password}/>

                <div><button className='btn-signup p-2' onClick={submit}>Sign Up</button></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default signup
