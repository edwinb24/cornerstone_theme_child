
import 'regenerator-runtime/runtime'

async function addItemsToCart (url, cartItems) {

        try {
                const resp = await fetch(url, {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(cartItems)
                })
                const response = await resp.json()
                if (!response) {
                        throw Error(resp.statusText);
                }
        } catch (error) {
                console.log(
                        `%c Error Adding Items to Cart \n 
                        ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
                )
        }
}

async function addAllItemsToCart () {
                
        const productDisplayer = document.getElementsByClassName("productGrid")[0]
        const productsDisplayList = productDisplayer.querySelectorAll("li")

        let prodId
        const itemList = []
        productsDisplayList.forEach(product => {
                prodId = product.querySelector("[data-product-id]").getAttribute("data-product-id")
                itemList.push({
                        "quantity": 1, 
                        "productId": parseInt(prodId)
                })
        })

        const carts = await getCart().then(data => data)
        let url = "/api/storefront/carts"
        url = carts.length > 0 ? url+`/${carts[0].id}/items`: url

        addItemsToCart(url, {"lineItems": itemList})
        const quantity = Number(localStorage.getItem('cart-quantity')) ?
                        Number(localStorage.getItem('cart-quantity')):
                        0

        $('body').trigger('cart-quantity-update', quantity + itemList.length); 
        
}

async function getCart() {
        let cartList = false
        try {
                const resp = await fetch('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options', {
                        method: "GET",
                        credentials: "same-origin",
                        headers: {"content-type": "application/json"}
                })
                const response = await resp.json()
                if (!response)
                        throw Error(resp.statusText)
                else
                        cartList = response  
        } catch (error) {
                console.log(
                        `%c Error Looking up Cart \n 
                        ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
                )
        }
        return cartList
}

async function deleteItem(cartId, itemId) {
        const url = `/api/storefront/carts/${cartId}/items/${itemId}?include=lineItems.digitalItems.options%2ClineItems.physicalItems.options`
        try {
                const resp = await fetch(url, {
                        method: "DELETE",
                        credentials: "same-origin",
                        headers: {"content-type": "application/json"}
                })
                if (!resp.status == 204)
                        throw Error(resp.statusText)
        } catch (error) {
                console.log(
                        `%c Error Deleting Items from Cart \n 
                        ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
                )
        }
}


/****** Delete all Items from cart by erasing cart ******/
/**
 * This implementation might cause unforseen effects in the application 
 * if I had more experience developing using BigCommerce I would feel more
 * confident about deleting items this way.
 **/

// async function deleteCart(cartId) {
//         const url = `/api/storefront/carts/${cartId}`
//         try {
//                 const resp = await fetch(url, {
//                         method: "DELETE",
//                         credentials: "same-origin",
//                         headers: {"content-type": "application/json"}
//                 })
//                 const response = await resp.json()
//                 if (!response)
//                         throw Error(resp.statusText)
//         } catch (error) {
//                 console.log(
//                         `%c Error Deleting Cart \n 
//                         ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
//                 )
//         }
// }

// async function removeAllItemsFromCart2 () {
//         const carts = await getCart().then(data => data)
//         carts.forEach(cart => {deleteCart(cart.id)})
// }

async function removeAllItemsFromCart () {
        const carts = await getCart().then(data => data)
        if(carts.length < 1)
                return
        carts.forEach((cart) => {
                let map = new Map(Object.entries(cart.lineItems))
                map.forEach(itemTypes => {
                        if(itemTypes.length > 0)
                                itemTypes.forEach(item => {
                                                deleteItem(cart.id, item.id)
                                })
                } )
        })
        $('body').trigger('cart-quantity-update', 0);
}


export const AddAllItems = () => $("#add-all-to--cart").click(() => addAllItemsToCart());
export const RemoveAllItems = () => $("#remove-all-to--cart").click(() => removeAllItemsFromCart());








        // const response = await fetch(`/api/storefront/carts`, {
        //         credentials: "include",
        //         method: "POST",
        //         body: JSON.stringify({ lineItems: lineItems })
        //     });

// export const RemoveAllItems = () => {
//     if(localStorage.getItem('cart-quantity') > 0)
//     $("#remove-all-to--cart").click(function() {
//         alert( "Handler for .click() called." );
//     });
// }
