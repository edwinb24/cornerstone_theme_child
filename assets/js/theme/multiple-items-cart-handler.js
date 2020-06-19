
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
                console.log(parseInt(prodId))
                itemList.push({
                        "quantity": 1, 
                        "productId": parseInt(prodId)
                })
        })

        const carts = await getCart().then(data => data)
        let url = "/api/storefront/carts"
        url = carts.length > 0 ? url+`/${carts[0].id}/items`: url

        addItemsToCart(url, {"lineItems": itemList})
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
        const url = `/api/storefront/carts/${cartId}/items/${itemId}`
        try {
                const resp = await fetch(url, {
                        method: "DELETE",
                        credentials: "same-origin",
                        headers: {"content-type": "application/json"}
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

async function deleteCart(cartId) {
        const url = `/api/storefront/carts/${cartId}`
        try {
                const resp = await fetch(url, {
                        method: "DELETE",
                        credentials: "same-origin",
                        headers: {"content-type": "application/json"}
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
        const carts = await getCart().then(data => data)
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

async function removeAllItemsFromCart2 () {
        const carts = await getCart().then(data => data)
        carts.forEach(cart => {deleteCart(cart.id)})
}

export const AddAllItems = () => $("#add-all-to--cart").click(() => addAllItemsToCart());
export const RemoveAllItems = () => $("#remove-all-to--cart").click(() => removeAllItemsFromCart2());








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
