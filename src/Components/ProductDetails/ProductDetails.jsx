import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";




export default function ProductDetails() {

    const params = useParams();
    const {addToCart} = useContext(CartContext);
    

    function getProductDetails(id){
       
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    

    const { data} = useQuery('productdetailsRequest' ,()=>getProductDetails(params.id) )
    
        
    
    console.log(data?.data.data)

    const settings = {
        
        infinite: true,
        autoplay:true,
        autoplaySpeed:4000,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
       
        focusOnSelect: true,
        swipeToSlide: true,
      };

  return (
    <>

            <Helmet>
                <link rel="icon" href='shop.ico' />
                <title>{data?.data.data.title}</title>
                
            </Helmet>

    <div className='container my-5'>
        <div className='row py-2 align-items-center'>
            <div className='col-md-4'>
                

                <Slider {...settings}>
         
         {data?.data.data.images.map((cat , index)=> <div key={index} >

            <img className='w-100' height={450} src={cat} alt='slider'/>
            

         </div>)}
         
          
        </Slider>
            </div>

            <div className='col-md-8'>
                <h2>{data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>
                <h6 className='main-color' >{data?.data.data.category.name}</h6>
                <h6>{data?.data.data.price} EGP</h6>
                
                <div className='d-flex justify-content-between'>
                <span> RatingsQuantity : {data?.data.data.ratingsQuantity} </span>
                <span> RatingsAverage : {data?.data.data.ratingsAverage} <i className="fa-solid fa-star" style={{color:'#ffd43b'}}></i></span>
                </div>

                
                <button className='btn btn-success text-white w-100 my-2' onClick={()=>addToCart(params.id) ? 
                    toast.success(`goodproduct added successfully`,{duration:3000,position:'top-right'}):toast.error(`error adding product`)}>
                        Add To Cart
                </button>
               
            </div>
        </div>
    </div>
    </>
  )
}
