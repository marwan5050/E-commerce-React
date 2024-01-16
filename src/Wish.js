import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const WishContext = createContext();


export default function WishContextProvider(props){

    const [numItems , setNumItems] = useState(0);

   

    // add products to wish list
    function displayWishItems(){

        return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
  
        headers: {
          token : localStorage.getItem('userToken')
        }
        }).then((response)=>  response).catch((error)=> error)
        
      }
  


    // get wish cart number items

    async function getNumitems(){

        try {
            
            const response = await displayWishItems()

            const itemCount = response?.data?.count || 0;

            setNumItems(itemCount)
            console.log(itemCount);
        } catch (error) {
            console.error("Error fetching wish cart items count:", error);
        }
    }



    // add product to cart
    async function addToWishList(id, onSuccessCallback) {
        try {
          const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId: id },
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
    
          if (response.data.status === 'success') {
            // After successfully adding items, update the cart count
            await getNumitems();
            if (onSuccessCallback) {
              onSuccessCallback();
            }
          } return response;

        } catch (error) {
            console.error("Error adding product:", error);
          
        }
      }



      async function removeWishItem(id, onSuccessCallback) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: {
                    token: localStorage.getItem('userToken'),
                },
            });
    
            if (response.data.status === 'success') {
                await getNumitems();
                if (onSuccessCallback) {
                    onSuccessCallback();
                }
            }
            return response; // Make sure to return the response here
        } catch (error) {
            console.error("Error removing product:", error);
            
        }
    }


      useEffect(()=>{
        getNumitems();
    },[getNumitems])


    return <WishContext.Provider value={{addToWishList , displayWishItems , removeWishItem , getNumitems , numItems}}>
            {props.children}
    </WishContext.Provider>
}