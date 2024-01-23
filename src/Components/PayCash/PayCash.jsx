import {  useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../OrderContext';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import {   useNavigate } from 'react-router-dom';
import { BallTriangle } from  'react-loader-spinner';
import * as Yup from 'yup'; 



export default function PayCash() {

    const {cashPayment} = useContext(OrderContext);
    const {cartId , getCartId , getCartNumItems} = useContext(CartContext);
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    

   async function handleCash(values){

    setIsLoading(true);
     const {data} = await cashPayment(cartId, values);
  
     if(data?.status === 'success'){
      setIsLoading(false);
       getCartNumItems();
      
      toast.success('order shiped successfully');
      navigate('/allorders');
     } else{
      
      setIsLoading(false);
      toast.error('error order');
     }
     
     }


     const validationSchema = Yup.object({
      address:Yup.string().min(10,'address must grater than 10 chars').max(25,'address must less than or equal 25 chars').required('address is required'),
      phone:Yup.string().required('mobile is required'),
      city:Yup.string().min(2,'ciy must grater than 2 chars').max(15,'city must less than or equal 15 chars').required('city is required'),
      
    })


    const formik = useFormik({
        initialValues:{
            'address':'',
            'phone':'',
            'city':''
        },
        validationSchema:validationSchema,
        onSubmit:handleCash
    })


    useEffect(()=>{
      getCartId();
      getCartNumItems();
    },[getCartId , getCartNumItems])

  return (
<>
  <div className='container my-5'>
     <form onSubmit={formik.handleSubmit}>
        <div >
            <label htmlFor='address'>Address :</label>
            <input type='text' className='form-control my-1' name='address' id='address' 
           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}/>
        </div>

        <div className='my-2'>
            <label htmlFor='phone'>Phone :</label>
            <input type='tel' className='form-control my-1' name='phone' id='phone' 
           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
        </div>

        <div>
            <label htmlFor='city'>City :</label>
            <input type='text' className='form-control my-1' name='city' id='city' 
           onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}/>
        </div>

        <div className='my-2'>
          { isLoading ? <>
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
          </>: <>
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success text-white text-capitalize'>pay on delivery</button>
            </>
          }  
        </div>
     </form>
  </div>
    
 </>
  )
}
















