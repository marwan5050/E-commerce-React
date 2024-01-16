import axios from 'axios';
import { useContext } from 'react';
import {BallTriangle} from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategoreySlider from '../CategoreySlider/CategoreySlider';
import Footer from '../Footer/Footer';
import style from './Products.module.css'
import { WishContext } from '../../Wish';


export default function Products() {

  const {addToCart , getCartNumItems} = useContext(CartContext);
  const {addToWishList , getNumitems } = useContext(WishContext);

 async function addProductToCart(id){
    const response = await addToCart(id);

    if(response.data.status === 'success'){

      
      toast.success('product added successfully',{
        duration:3000,
        position:'top-right'
      })
      getCartNumItems();
    }
    else{
      
      toast.error(`error adding product`)
    }
  }

  // add to wishlist

 async function addToWish(id){

    const resonse = await addToWishList(id);

    if(resonse.data.status === 'success'){

      toast.success('Product Added To Wish List Successfully',{
        duration:3000,
        position:'top-right'
      })
      getNumitems();
    } else{
      toast.error(`error adding product`)
    }
  }







  function getProducts(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  const {isLoading , data} = useQuery('productRequest' , getProducts , {
    cacheTime:10000
  } );
  



  

  return (
    <>

    {!isLoading ? <>
      <div className='container my-5'>

        <div className='row gx-0 my-5'>

          <div className='col-md-9'>
            <HomeSlider />
          </div>

          <div className='col-md-3'>

            <img className='w-100' height={200} src={require('../Assets/Images/grocery-banner.png')} alt='slider' />
            <img className='w-100' height={200} src={require('../Assets/Images/grocery-banner-2.jpeg')} alt='slider' />

          </div>

        </div>

        <div className='my-5'>
          < CategoreySlider />
        </div>


        <div className='row gy-5'>
          {data?.data.data.map((product , index)=>
          <div className='col-md-2' key={index}>
              <div className={`${style.zoom} text-center cursor-pointer border border-secondary-subtle p-1`} >
            <Link to={`/productdetails/${product.id}`}>
                <img src={product.imageCover} className='w-100' alt='product' />
                <h6 className='pt-1'>{product.category.name}</h6>
                <h5 className='h6 main-color py-1'>{product.title.split(' ').slice(0,2).join(' ')}</h5>
                <div className='d-flex justify-content-around align-items-center'>

                <p>{product.price} EGP</p>
                <p> {product.ratingsAverage} <i className="fa-solid fa-star" style={{color:'#ffd43b'}}></i></p>

                </div>

            </Link>
            <div className='d-flex justify-content-between'> 
            <button onClick={()=>addProductToCart(product.id)} title='Add To Cart' className='btn text-success'><i className={`fa-solid fa-cart-plus fa-xl ${style.cart}`}></i></button>
            <button onClick={()=>addToWish(product.id)} title='Add To Wish List' className=' btn text-danger '><i  className={`fa-regular fa-heart fa-xl  ${style.wish}`}></i></button>
            </div>

              </div>
          </div>
          )}
          
          </div>
        </div>
    </> : <>
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
          </>}

     <Footer/>     
    </>
  )
}
