import {  useFormik } from 'formik';
import React, {useState, useContext } from 'react';
import { OrderContext } from '../../OrderContext';
import { CartContext } from '../../CartContext';
import { BallTriangle } from  'react-loader-spinner';



export default function Payinfo() {

    const {onlinePayment} = useContext(OrderContext);
    const {cartId , getCartNumItems} = useContext(CartContext);
    const [isLoading , setIsLoading] = useState(false);

  async  function handleSubmit(values){
    setIsLoading(true);
     const response = await onlinePayment(cartId, 'https://marwan5050.github.io/E-commerce-React/#' , values)
     .catch(()=>{
      setIsLoading(false);
     })
     getCartNumItems();
      console.log(response.data)
    // we use this becouse the direction is outside project so we had to use location,href 
     window.location.href = response?.data.session.url;
    
    }


    const formik = useFormik({
        initialValues:{
            'address':'',
            'phone':'',
            'city':''
        },
        onSubmit:handleSubmit
    })

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
          </> :<>
            <button type='submit' className='btn btn-success text-white text-capitalize'>pay now</button>
            </>
          }
        </div>
     </form>
  </div>
    
 </>
  )
}
