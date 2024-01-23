import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import butIcon from '../Assets/Images/app-store-badge.svg';
import butIcon2 from '../Assets/Images/google-play-badge.svg';
import toast from 'react-hot-toast';
import FooterStyle from './Footer.module.css';
import { BallTriangle } from  'react-loader-spinner';



export default function Footer() {

  const [userEmail, setUserEmail] = useState('');
  const [isLoading , setIsLoading] = useState(false);


  const sendEmail = () => {
    
    setIsLoading(true);

    const templateParams = {
      to_email: userEmail,
      message: 'We will publish soon!',
    };

    emailjs.send('service_yttczzl', 'template_f9g8sl3', templateParams, 'AQYtzGkTPsOtsCylI')
    
      .then((response) => {
        console.log('Email sent!', response);
        setIsLoading(false)
        toast.success('Email Sent Check Your Email');
        setUserEmail('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('error')
        setIsLoading(false)
      });
    };  

  return (
    <>
    <div className='bg-light py-5'>

      <div className='container'>
            <div className='head'>
              <h3 className='text-capitalize mb-2'>get the freshCart app</h3>
              <div className={ `text-muted text-capitalize fs-6 py-2 lh-lg ${FooterStyle.headText}`}>we will send you a link open it to download the app</div>
            </div>

          <div className={`row d-flex justify-content-between  border-bottom py-4 `}>
              <div className='col-8 col-md-10' >
              <input type='email' id='emailInput' name='from_name' className={` form-control`}
              placeholder='Email...' 
              value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}/>
              </div>
                {isLoading ? <>
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
                </>: <>
                <div className={`col-4 col-md-2`}>
              <button onClick={sendEmail} className='btn btn-success text-white text-capitalize'>share app link</button>
              </div>
              </>}
          </div>

            <div className='botm   d-sm-block d-md-flex justify-content-between border-bottom'>
              <div className='leftside my-2  d-flex justify-content-between align-items-center '>
                <div className='fs-4 me-2 fst-italic'> payment partners </div>
                <div className='icons pt-2'>
                  <i className="fa-brands fa-amazon-pay fa-xl mx-2 text-primary"></i>
                  <i className="fa-brands fa-google-pay fa-xl mx-2 text-success"></i>
                  <i className="fa-brands fa-cc-mastercard fa-xl mx-2 text-warning"></i>
                  <i className="fa-brands fa-paypal fa-xl mx-2 text-primary"></i>
                </div>
              </div>
            
              
                <div className='rightside  row d-flex  justify-content-sm-between  justify-content-md-end align-items-center  ' >
                    <div className='col-8 col-md-9  d-flex justify-content-sm-start justify-content-md-end ' >
                      <div className='fs-5 fs-md-4 text-capitalize fst-italic'>get deliveries with fresh cart</div>
                    </div>

                    <div className={` col-4 col-md-3  d-flex justify-content-sm-between justify-content-md-around  `}  >
                      <img src={butIcon} className={`  ${FooterStyle.imageWidth}`}  alt='applestore'/>
                      <img src={butIcon2} className={` ${FooterStyle.imageWidth}`}   alt='googlestore'/>
                    </div>
                </div>
            </div>

            <div className='footerEnd d-flex justify-content-center pt-3'>
              <div className='text-capitalize text-secondary fst-italic   fs-6  lh-lg'>all copyright  <i class="fa-regular fa-copyright"></i> reserved <i class="fa-regular fa-registered"></i>  by <span className='text-success fs-5'>marwan abdullah</span> 2023</div>
            </div>
      </div>
    </div>
    </>
  )
}
