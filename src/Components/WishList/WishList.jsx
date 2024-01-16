import React, { useContext } from 'react';
import { WishContext } from '../../Wish';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import style from './WishList.module.css';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import {BallTriangle} from 'react-loader-spinner';



export default function WishList() {

    const {displayWishItems , removeWishItem} = useContext(WishContext);
    const {addToCart} = useContext(CartContext);


    async function addProductToCart(id){
        const response = await addToCart(id);
    
        if(response.data.status === 'success'){
    
          
          toast.success('product added successfully',{
            duration:3000,
            position:'top-right'
          })
        }
        else{
          
          toast.error(`error adding product`)
        }
      }


   const {data , isLoading , refetch  } =  useQuery('getwhishitems' , displayWishItems)



  return (
    <>
    <div className='container my-5'>

        {isLoading ? (
            <div className='vh-100 d-flex justify-content-center align-items-center' >

            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
          </div>
        ): 
        (
        <>
        <h2 className='fst-italic fs-1 text-capitalize my-4 text-warning'>wish cart</h2>
        {data?.data.data.length === 0 ? (
            <div className='text-center p-2 fst-italic fs-5 text-capitalize text-secondary'>wish Cart is empty go to products section to add more <span> <i className="fa-solid fa-truck-arrow-right fa-lg mx-1" ></i> </span> <Link to='/products' className={style.x}  >Products</Link> </div>
        ):""} 
    <div className='row gy-5'>
          {data?.data.data.map((item , index)=>
          <div className='col-md-2' key={index}>
              <div className={`${style.zoom} text-center cursor-pointer border border-secondary-subtle p-1`} >
                <Link to={`/productdetails/${item.id}`}>
                    <img src={item.imageCover} className='w-100' alt='product' />
                    <h6 className='pt-1'>{item.category.name}</h6>
                    <h5 className='h6 main-color py-1'>{item.title.split(' ').slice(0,2).join(' ')}</h5>
                    <div className='d-flex justify-content-around align-items-center'>

                    <p>{item.price} EGP</p>
                    <p> {item.ratingsAverage} <i className="fa-solid fa-star" style={{color:'#ffd43b'}}></i></p>

                    </div>

                </Link>
            <div className='d-flex justify-content-between'> 
            <button onClick={()=>addProductToCart(item.id)} title='Add To Cart' className='btn text-success'><i className={`fa-solid fa-cart-plus fa-xl ${style.cart}`}></i></button>
           
            <button onClick={()=>{
                removeWishItem(item._id , ()=>{
                    refetch()
                })}}  title='Remove Item' className=' btn text-danger '><i className="fa-solid fa-trash-can fa-xl"></i></button>
            </div>

              </div>
          </div>
          )}
          
         </div>
         </>)}
    </div>
   </>
  )
}