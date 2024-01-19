import {  useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../OrderContext';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import {   useNavigate } from 'react-router-dom';
import { BallTriangle } from  'react-loader-spinner';



export default function PayCash() {

    const {cashPayment} = useContext(OrderContext);
    const {cartId , getCartId , getCartNumItems} = useContext(CartContext);
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    

   async function handleCash(values){

    setIsLoading(true);
     const {data} = await cashPayment(cartId, values);
  


     console.log(data)
     if(data?.status === 'success'){
      setIsLoading(false);
       getCartNumItems();
      console.log('done');
      toast.success('order shiped successfully');
      navigate('/allorders');
     } else{
      console.log('no');
      setIsLoading(false);
      toast.error('error order');
     }
     
     }


    const formik = useFormik({
        initialValues:{
            'address':'',
            'phone':'',
            'city':''
        },
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
            <button  type='submit' className='btn btn-success text-white text-capitalize'>pay on delivery</button>
            </>
          }  
        </div>
     </form>
  </div>
    
 </>
  )
}
















