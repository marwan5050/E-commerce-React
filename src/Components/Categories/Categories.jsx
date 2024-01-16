import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import CategoreySlider from '../CategoreySlider/CategoreySlider';
import style from './categories.module.css';
import { Link } from 'react-router-dom';
import {BallTriangle} from 'react-loader-spinner';
import Footer from '../Footer/Footer';



export default function Categories() {

  
  


  function getAllCategories(){

   return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }

  const {data , isLoading} = useQuery('categoryRequest' , getAllCategories );


  

  return (
    <>

      

    {!isLoading ?(<>
    <div className='container pb-5 my-5'>
      <CategoreySlider/>
    </div>

    <div className='container my-5'> 
      <div className='row '>

          
          {data?.data?.data.map((cat, index)=> <div key={index} className='col-md-4 p-2'>
              <Link to={`/specificgate/${cat._id}`} >
                <div className=' border p-4  text-center'>
                  <img src={cat.image}  className={style.x} height={250} alt='pic' />
                </div>
                <h5  className='text-center my-2'>{cat.name}</h5>
              </Link>
          </div>
           )}

      </div>

      
    </div>
    </>) : ( <div className='vh-100 d-flex justify-content-center align-items-center'>
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
        </div> )}
    
    <Footer/>
    </>
  )
}









