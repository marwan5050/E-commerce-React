import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {

     const settings = {
      dots: true,
      infinite: true,
      autoplay:true,
      autoplaySpeed:5000,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false
    };

  return (
    <>
    <div>
        
        <Slider {...settings}>
          <div>
            <img className='w-100' height={400} src={require('../Assets/Images/slider-image-1.jpeg')} alt='slider' />
          </div>
          <div>
          <img className='w-100' height={400} src={require('../Assets/Images/slider-image-2.jpeg')} alt='slider' />
          </div>
          <div>
          <img className='w-100' height={400} src={require('../Assets/Images/slider-image-3.jpeg')} alt='slider' />
          </div>
          <div>
          <img className='w-100' height={400} src={require('../Assets/Images/banner-4.jpeg')} alt='slider' />
          </div>
         
          
        </Slider>
      </div>
    </>
  )
}
