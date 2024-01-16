import React, { useContext } from 'react';
import { OrderContext } from '../../OrderContext';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';


export default function AllOrders() {

    const {getUserOrder} = useContext(OrderContext);


    // this line to get userid from token using jwt, and userid is object inside it the userid 
    const userId = jwtDecode(localStorage.getItem('userToken'));

   const {data} =   useQuery(`orderRequest` , ()=> getUserOrder(userId.id),{
    refetchOnMount:true,
   });

//    console.log(data?.data)

    


  return (
    <>
    <div className='container mt-5'>

    <h2 className='fst-italic fs-1 text-capitalize my-4 text-info'>your orders</h2>
    
      {data?.data.map((item , index)=> <div key={index} className='bg-light  mt-3 mb-5 p-4 rounded-4'>
        <div className='row border-bottom text-center'>
            <div className='col-md-3 text-capitalize py-2'>
                <h6>order placed</h6>
                <div>{item.createdAt}</div>
            </div>
            <div className='col-md-3 text-capitalize py-2'>
                <h6>total price</h6>
                <div>{item.totalOrderPrice} EGP</div>
            </div>
            <div className='col-md-3 text-capitalize py-2'>
                <h6>ship to</h6>
                <div>{item.user.name}</div>
            </div>
            <div className='col-md-3 text-capitalize py-2'>
                <h6>order id</h6>
                <div>#{item.id}</div>
            </div>

        </div>

        <div className='row border-bottom'>
            {item.cartItems.map((product,idx)=> <div key={idx} className='col-sm-4 '>
             <div className='order p-4 my-2  text-center '>   
                <img className='w-50' src={product.product.imageCover} alt='pic' />
                <p>{product.product.title.split(' ').slice(0,2).join(' ')}</p>
            </div>
            
            </div>)}
            <div className='d-flex align-items-center justify-content-between my-3'>
            <h5 className='text-capitalize fst-italic text-secondary'>paymentType : <span className='text-success'> {item.paymentMethodType}</span></h5>
            <h5 className='text-capitalize fst-italic text-secondary'>paid : {item.isPaid ? '✅' : '❌'}</h5>
            </div>
        </div>

        
        
      </div> )}  
    </div>  
</>
  )
}
