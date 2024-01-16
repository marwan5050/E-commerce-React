import React from 'react';

import errImg from '../Assets/Images/error.svg';

export default function Notfound() {
  return (
    <>
        <div className='d-flex justify-content-center my-5  '>
            <img src={errImg}   alt='imgerr'/>
        </div>
    </>
  )
}
