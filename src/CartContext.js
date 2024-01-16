import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();



export default function CartContextProvider(props){

     
    const [cartId , setCartId] =  useState(null);

    const [numCartItems , setNumCartItems] = useState(0);

    const [loadSpinner , setLoadSpinner] = useState(false);

    // display products in cart
    function GetLoggedusercart(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
    
            headers:{
            token:localStorage.getItem('userToken') 
            }
        })
        .then((response)=> response).catch((error)=> error)
    }  
    
   
        // get number of items in cart
        async function getCartNumItems() {
            try {
                const response = await GetLoggedusercart();
                // Assuming response.data holds the cart information with item count
                const itemCount = response?.data?.numOfCartItems || 0;
                setNumCartItems(itemCount);
            } catch (error) {
                console.error("Error fetching cart items count:", error);
            }
        }

        // add product to cart
        async function addToCart(id, onSuccessCallback) {
            try {
                
              const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: id },
                {
                  headers: {
                    token: localStorage.getItem('userToken'),
                  },
                }
              );
        
              if (response.data.status === 'success') {
                // After successfully adding items, update the cart count
                await getCartNumItems();
                
                if (onSuccessCallback) {
                  onSuccessCallback();
                }
              } return response;

            } catch (error) {
                console.error("Error adding product:", error);
                
            }
          }


// i used third param for call refetch to rerender component method from react-query

        //   increase or decrease product in cart
          function updatoCart(id , count , onSuccessCallback){
            
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
                 count:count
             },
             {
                 headers:{token:localStorage.getItem('userToken')}
             }).then((response)=> {
                
                 if(onSuccessCallback){
                     onSuccessCallback()
             } return response
             }).catch((error)=> error )
         }  

        //   remove item from cart
          async function removeItem(id, onSuccessCallback) {
            try {
                const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                    headers: {
                        token: localStorage.getItem('userToken'),
                    },
                });
        
                if (response.data.status === 'success') {
                    await getCartNumItems();
                    if (onSuccessCallback) {
                        onSuccessCallback();
                    }
                }
                return response; // Make sure to return the response here
            } catch (error) {
                console.error("Error removing product:", error);
                
            }
        }
        


        // remove all products from cart
        function clearItems(onSuccessCallback){
            setLoadSpinner(true)
        return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{token:localStorage.getItem(`userToken`)}
            }).then((response)=> {
                setNumCartItems(0)
                setLoadSpinner(false)
                if(onSuccessCallback){
                    onSuccessCallback();
                } return response
            }).catch(()=>setLoadSpinner(false))
        }




   async function getCartId(){

    const {data} =  await GetLoggedusercart()
    
        setCartId(data?.data?._id);
    }

    useEffect(()=>{

        getCartId();
        getCartNumItems();
        
    },[])


    return <CartContext.Provider value={{loadSpinner , addToCart ,getCartId ,GetLoggedusercart ,cartId , removeItem , updatoCart , clearItems ,getCartNumItems ,numCartItems , setNumCartItems}}>

        {props.children}
    </CartContext.Provider>
}
