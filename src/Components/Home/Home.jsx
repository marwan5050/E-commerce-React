import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Products from '../Products/Products';
import {BallTriangle} from 'react-loader-spinner';

export default function Home() {

  const [isLoading , setIsLoading] = useState(false);

  return (
    <>

<Helmet>
                
  <title>Fresh Cart</title>
                
</Helmet>

    


{!isLoading ? (
        <>
          <Products />
          
        </>
      ) : (
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
      )}
    

    
    </>
  )
}
