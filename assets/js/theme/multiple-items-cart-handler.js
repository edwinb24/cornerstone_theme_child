
import 'regenerator-runtime/runtime'

// function displayAlert(message) {
//         const overlay = document.getElementById("overlay")
//         overlay.style("display","block")
// }

async function createCart2 (url, cartItems) {
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
                // displayAlert("items Added to Cart")
        } catch (error) {
                console.log(
                        `%c Error Adding Items to Cart \n 
                        ${error}`, "color: salmon; font-size: 18px; font-weight: 800"
                )
        }
}

function addAllItemsToBasket () {
      createCart2(`/api/storefront/carts`, {
        "lineItems": [
        {
            "quantity": 1,
            "productId": 86
        },
        {
            "quantity": 1,
            "productId": 88
        }
        ]}
     )
     .then(data => console.log(JSON.stringify(data)))
     .catch(error => console.error(error));
}

export const AddAllItems = () => 
        console.log("Irun")
        $("#add-all-to--cart").click(() => addAllItemsToBasket());

export const RemoveAllItems = () => 
        console.log("Irun")
        $("#remove-all-to--cart").click(() => addAllItemsToBasket());


        // const response = await fetch(`/api/storefront/carts`, {
        //         credentials: "include",
        //         method: "POST",
        //         body: JSON.stringify({ lineItems: lineItems })
        //     });

// export const RemoveAllItems = () => {
//     if(localStorage.getItem('cart-quantity') > 0)
//     console.log("Irun")
//     $("#remove-all-to--cart").click(function() {
//         alert( "Handler for .click() called." );
//     });
// }
