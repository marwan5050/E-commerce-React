import axios from 'axios';
import { useFormik } from 'formik';
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { BallTriangle } from  'react-loader-spinner'



export default function Register() {

   const[error, setError] =  useState(null);
   const[isLoading, setIsLoading] =  useState(false);
   const navigate = useNavigate();
   

  const phoneRegex= /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

 async function registerForm(values){

  setIsLoading(true)

    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .catch((err)=> {

      setIsLoading(false);
      setError(err.response.data.message)
      
    })

    if(data.message === "success"){
      setIsLoading(false)
      
      navigate('/login');
    }
  }

  const validationSchema = Yup.object({
    name:Yup.string().min(3,'name must grater than 3 chars').max(10,'name must less than or equal 10 chars').required('name is required'),
    phone:Yup.string().matches(phoneRegex,'mobile is invalid').required('mobile is required'),
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^[\w\d]{6}$/ , 'password must be only 6 length').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')] , 'repassword is invalid').required('repassword is required')
  })

  const formik = useFormik({
    initialValues:{
      name:"",
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema:validationSchema,

    onSubmit:registerForm

  })

  return (
   <div className='w-75 mx-auto my-5'>
    <h2>Register</h2>

    <form onSubmit={formik.handleSubmit}>

     {error !== null ?<div className='alert alert-danger' >{error}</div>:''}
      <div className='py-2'>
        <label htmlFor="name" >Name</label>
        <input type='text' className='form-control ' name='name' id='name'
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        value={formik.values.name}/>
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger my-1'>{formik.errors.name}</div>:''}
        
      </div>

      <div className='py-2'>
        <label htmlFor="mobile">mobile</label>
        <input type='tel' className='form-control' name='phone' id='mobile'
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        value={formik.values.phone}/>
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger my-1'>{formik.errors.phone}</div>:''}
      </div>

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

      <div className='py-2'>
        <label htmlFor="rePassword">rePassword</label>
        <input type='password' className='form-control' name='rePassword' id='rePassword'
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        value={formik.values.rePassword}/>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger my-1'>{formik.errors.rePassword}</div>:''}
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
        </> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success'> Register </button>}
 
      </div>

    </form>
   </div>
  )
}
