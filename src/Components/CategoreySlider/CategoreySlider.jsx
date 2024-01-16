import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';

export default function CategoreySlider() {

    function getGategories(){

     return   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

  const {data} =  useQuery('catSliderRequest' ,getGategories , {
        refetchOnMount:false
    } )


    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed:5000,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows:false
      };

  return (
    <>

<div>
        <h5 className='text-capitalize py-1'>shop popular categories</h5>
        <Slider {...settings}>
         
         {data?.data.data.map((cat , index)=> <div key={index} >

            <img className='w-100' height={250} src={cat.image} alt='slider'/>
            <h6 className='text-center py-2'>{cat.name}</h6>

         </div>)}
         
          
        </Slider>
      </div>

    </>
  )
}
