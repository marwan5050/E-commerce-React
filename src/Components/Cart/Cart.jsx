import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import style from './Cart.module.css';
import {BallTriangle} from 'react-loader-spinner';





export default function Cart() {

  const {GetLoggedusercart , removeItem , updatoCart , clearItems  , loadSpinner} = useContext(CartContext);


  const {isLoading , data , refetch , isError} = useQuery(`getItems` , GetLoggedusercart);

  // this line to handle undefiend error after clear cart items and if data is undefiend set products to empty array
  const products = data?.data?.data?.products || [];
  
  


  return (
    <>
    
    <div className='container my-5 bg-light'>
      {isLoading ? (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color='#4fa94d'
          ariaLabel='ball-triangle-loading'
          wrapperClass={{}}
          wrapperStyle=''
          visible={true}
        />
      </div>
        ) : isError ? (
          <div>Cart is empty go to products section to add more <Link to='/products'>Products</Link> </div>
          ) : products.length === 0 ? (
            <div className='text-center p-2 fst-italic fs-5 text-capitalize text-secondary'>Cart is empty go to products section to add more <span> <i className="fa-solid fa-truck-arrow-right fa-lg mx-1" ></i> </span> <Link to='/products' className={style.x}  >Products</Link> </div>
            ) : (
              <>
      <h2 className='text-capitalize py-1 text-danger fst-italic'>shop cart :</h2>
      <h4 className='h6 main-color text-capitalize mb-2'>total price : {data?.data.data.totalCartPrice} EGP</h4>

      {
        products.map((item)=><div key={item.product.id} className='row border-bottom py-3'>

        <div className='col-md-1'>
          <img className='w-100' src={item.product.imageCover} alt='pic'/>
        </div>

        <div className='col-md-11'>

          <div className='d-flex justify-content-between align-items-center'>

            <div>
              <h3 className='h6'>{item.product.title.split(' ').slice(0,2).join(' ')}</h3>
              <h6 className='text-capitalize main-color'> price : {item.price} </h6>
              </div>

              <div>
                
                
                <button onClick={() => {
                  
                  updatoCart(item.product.id, item.count + 1, () => {
                    
                    
                    refetch(); 

                  });
                }} className='btn bdr'>+</button>
              

                    
                
                <span className='mx-2'>{item.count}</span>
                <button onClick={() => {
                  updatoCart(item.product.id, item.count - 1, () => {
                    
                    refetch(); 
                  });
                }} className='btn bdr' disabled={item.count === 1}>-</button>
                
              </div>
            
          </div>

          
          <button className='btn p-0' onClick={()=>{
            removeItem(item.product.id , ()=>{
              refetch();
            })
          } } ><i className='text-danger fs-small fas fa-trash-can'></i> Remove</button>

        </div>

      </div>)}
<div className='d-sm-block d-md-flex align-items-center justify-content-between py-1'>

<div className='pay py-1'>
  <Link to='/payinfo' className='btn btn-success text-white text-capitalize fst-italic'>pay online</Link>
  <Link to='/paycash' className='btn btn-primary text-white text-capitalize fst-italic mx-2'>cash on delivery</Link>
</div>

<div>
  {loadSpinner ? <>
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
    </>:<>
    <button onClick={()=> {
      clearItems(()=>{
        refetch();
      })
    }} className='btn btn-danger my-2 text-capitalize fst-italic'>remove all products
    </button>
  </>}
</div>


</div>
</>
)}
    </div>

    </>
  )
}
