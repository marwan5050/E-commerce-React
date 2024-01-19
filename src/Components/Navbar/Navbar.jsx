import React, {  useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Images/freshcart-logo.svg';
import { userContext } from '../../UserContext';
import { CartContext } from '../../CartContext';
import { WishContext } from '../../Wish';
import style from './Navbar.module.css';



export default function Navbar() {

  const {userToken , setUserToken , userName} = useContext(userContext);
  const {numCartItems} = useContext(CartContext);
  const {numItems} = useContext(WishContext);
  const navigate = useNavigate();

  function logout(){

    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }



  return (
<>
  <nav className="navbar navbar-expand-sm navbar-light bg-light py-4">
    <div className="container">
      <img src={Logo} alt='logo' />
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          {userToken !== null ? <>
          <li className="nav-item">
            <Link className="nav-link active" to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          
          <li className="nav-item position-relative">
            <Link className="nav-link " to="/cart"><i className="fa-solid fa-cart-shopping text-success my-1" style={{fontSize:"22px"}}></i>
            
              <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger mt-3 mt-md-0">
                {numCartItems !== 0 && ( // Check if numCartItems is not zero
                  <>
                    {numCartItems} {/* Display the count if numCartItems is not zero */}
                    <span className="visually-hidden">unread messages</span>
                  </>
                )}
              </span>

            </Link>
          </li>
          <li className="nav-item position-relative  ">
            <Link className="nav-link" to="/wishlist">
              <i className="fa-regular fa-heart my-1" style={{fontSize:"22px"}}></i>
              <span className="position-absolute top-0  end-0 translate-middle badge rounded-pill bg-warning  mt-3 mt-md-0">
                  {numItems !== 0 && ( 
                    <>
                      {numItems} 
                      <span className="visually-hidden">unread messages</span>
                    </>
                  )}
                </span>
            </Link>
          </li>
          </>:''}
        </ul>


        <ul className="navbar-nav ms-auto mt-2  mt-lg-0">
          
         
          {userToken !== null ? <>
           

            <li className="nav-item d-flex justify-content-sm-start justify-content-md-center align-items-center">
            <i className='fab fa-facebook pe-2 text-primary cursor-pointer' ></i>
            <i className='fab fa-instagram px-2 text-danger cursor-pointer' ></i>
            <i className='fab fa-twitter px-2 text-primary cursor-pointer' ></i>
            <i className='fab fa-youtube px-2 text-danger cursor-pointer' ></i>
            <i className='fab fa-tiktok px-2 cursor-pointer' ></i>
          </li>

        <li className="nav-item dropdown  ">
      <div className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <div className={` d-flex align-items-center justify-content-center ${style.circle}  `}>
          <span className={`text-capitalize ${style.normal} `}> {userName.charAt(0)} </span>
          </div>
       
      </div>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><span className={`dropdown-item text-capitalize ${style.hov}`}>{`Welcome ${userName}`}</span></li>
        <li><span className={`dropdown-item cursor-pointer ${style.hov}`} onClick={logout} >Logout</span></li>
        
      </ul>
    </li>


          </>: <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          </>}
          
        </ul>
        
      </div>
    </div>
  </nav>

    
</>
  )
}
