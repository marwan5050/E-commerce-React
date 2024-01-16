import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import style from './categories.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {Helmet} from "react-helmet";


export default function SpecificGate() {

    const params = useParams();

    function getSpecificGategorey(id){
   
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    
       }


       function getSubCategories(id){

        return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`);
       }



      const {data: specifcGate} = useQuery('specificgateRequest' , ()=> getSpecificGategorey(params.id)); 
      const {data: subGate} = useQuery('subgateRequest' , ()=> getSubCategories(params.id)); 

console.log(specifcGate?.data.data.name)

      const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed:3000,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };

  return (
   <>
   <Helmet>
        <link rel="icon" href='shop.ico' />
        <title>{specifcGate?.data.data.name}</title>
                
    </Helmet>

   <div className='container  py-5'>
        <div className='w-50  mt-2 mb-5'>
            
            <div className=' border p-2  text-center'>
                  <img src={specifcGate?.data.data.image}  className='w-100' height={250} alt='pic' />
            </div>
                    <h5  className='text-center text-secondary my-5 mt-4'>{specifcGate?.data.data.name}</h5>
        </div>
            
            <div className='pt-4'>
            <h4 className='text-capitalize fst-italic text-center text-secondary mb-5 mt-5'>some subcategories of category 👇👇</h4>
            </div>

        <div className='my-5 w-50 mx-auto'>
        <Slider {...settings}>
            {subGate?.data?.data.map((item , index)=> <div key={index} className='text-center py-4'>
                        <div className='badge rounded-pill text-bg-success fs-5 p-3 '>{item.name}</div>
            </div> )}
       </Slider>
        </div>
    </div>        
           
   </>
  )
}
