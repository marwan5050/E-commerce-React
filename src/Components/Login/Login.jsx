import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { BallTriangle } from  'react-loader-spinner';
import { userContext } from '../../UserContext';


export default function Login() {

   const[error, setError] =  useState(null);
   const[isLoading, setIsLoading] =  useState(false);
   const navigate = useNavigate();
   const {setUserToken , setUserName} = useContext(userContext)

  const phoneRegex= /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

 async function loginForm(values){
  setIsLoading(true)
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .catch((err)=> {
      
      setIsLoading(false);
      setError(err.response.data.message)
      
    })

    if(data.message === "success"){
      setIsLoading(false);
      
      localStorage.setItem('userToken' , data.token);
      localStorage.setItem('userName' , data.user.name);
      setUserToken(data.token);
      setUserName(data.user.name);
      navigate('/');
    }
  }

  const validationSchema = Yup.object({
    
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^[\w\d]{6}$/ , 'password must be only 6 length').required('password is required'),
    
  })

  const formik = useFormik({
    initialValues:{
      
      email:'',
      password:'',
      
    },
    validationSchema:validationSchema,

    onSubmit:loginForm

  })

  return (
   <div className='w-75 mx-auto my-5'>
    <h2>Register</h2>

    <form onSubmit={formik.handleSubmit}>

     {error !== null ?<div className='alert alert-danger' >{error}</div>:''}
      

      

      <div className='py-2'>
        <label htmlFor="email">Email</label>
        <input type='email' className='form-control' name='email' id='email'
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        value={formik.values.email}/>
         {formik.errors.email && formik.touched.email ? <div className='alert alert-danger my-1'>{formik.errors.email}</div>:''}
      </div>

      <div className='py-2'>
        <label htmlFor="password">password</label>
        <input type='password' className='form-control' name='password' id='password'
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        value={formik.values.password}/>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger my-1'>{formik.errors.password}</div>:''}
      </div>

      

      <div  className='py-2'>
        {isLoading ? <>
          <button className='btn' >
          <BallTriangle
            height={40}
            width={40}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
          </button>
          </> : <>
         
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'> Login </button>
          <Link className='btn  mx-1' to='/register'>Register</Link>
         
          
          </>   
        }
      </div>

    </form>
   </div>
  )
}

