
import 'regenerator-runtime/runtime'

// function displayAlert(message) {
//         const overlay = document.getElementById("overlay")
//         overlay.style("display","block")
        // const header = document.getElementsByClassName('header')[0]
        // header.appendChild(div)
// }

async function addItemsToCart (url, cartItems) {
        try {
                const resp = await fetch(url, {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"},
                        body: JSON.stringify(cartItems),
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

async function getAllItems(url) {
        let cartList = false
        try {
                const resp = await fetch(url, {
                        method: "GET",
                        credentials: "same-origin",
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


async function addAllItemsToCart () {
        const carts = await getAllItems('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(data => data)
        console.log(carts)
        // addItemsToCart(`/api/storefront/carts`, {
        //         "lineItems": [
        //                 {"quantity": 1, "productId": 86}
        //         ]
        // })
}

async function getCart(url) {
        let cartList = false
        try {
                const resp = await fetch(url, {
                        method: "GET",
                        credentials: "same-origin",
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
        const url = `/api/storefront/carts/${cartId}/items/${itemId}`
        try {
                const resp = await fetch(url, {
                        method: "DELETE",
                        credentials: "same-origin",
                        headers: {"Content-Type": "application/json"}
                })
                const response = await resp.json()
                if (!response)
                        throw Error(resp.statusText)
        } catch (error) {
                console.log(
                        `%c Error Looking up Cart \n 
                        ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
                )
        }
}

async function removeAllItemsFromCart () {
        const carts = await getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options').then(data => data)
        console.log(carts)
        carts.forEach((cart) => {
                let map = new Map(Object.entries(cart.lineItems))
                map.forEach(itemTypes => {
                        if(itemTypes.length > 0)
                                itemTypes.forEach(item => {
                                                deleteItem(cart.id, item.id)
                                })
                } )
        })
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
