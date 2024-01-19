import axios from "axios";
import { createContext } from "react";




export const OrderContext = createContext();

// this function to get the link of stripe gate to pay money
function onlinePayment(cartId ,  values){

return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
{shippingAddress:values},
{
    headers:{
        token:localStorage.getItem('userToken')
    },

    params:{url:'https://marwan5050.github.io/E-commerce-React/#'}
    
}).then((response)=> response).catch((error)=> error) 
}

function cashPayment(cartId , values){

    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {shippingAddress:values},
    {
        headers:{
            token:localStorage.getItem('userToken')
        }
    }).then((response)=> response).catch((error)=> error)
}    


//this function to dispaly orders after payment    
function getUserOrder(userId){

  return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  .then((response)=> response)
  .catch((err)=>err)
}

export default function OrderContextProvider(props){

    return <OrderContext.Provider value={{onlinePayment , cashPayment ,getUserOrder }}>

        {props.children}
    </OrderContext.Provider>
}