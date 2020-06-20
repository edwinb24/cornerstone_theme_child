Links to the Storefront and preview code:

**Storefront:** https://edwin-broces-amazing-store.mybigcommerce.com

**Preview Code:** i5lrc84iiy

   First, I created a BigCommerce account. Then, I installed the Stencil CLI in my Windows machine using Chocolatey and went through the steps to live preview a theme.

**Create a product called Special Item which will be assigned to a new category called Special Items. Be sure to add at least 2 images during the product creation**

   I added two images that I often use for testing purposes to a product I created under a new category called "Special Items."

**The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on. ** 

   When I opened VS Code for the first time, I noticed similarities between the technology I had not used (BigCommerce and Stencil) and ones I had used extensively. The structure using templates and handlebars is similar to WordPress, while the component base design reminds me of React. I began by trying to use the responsive-img component, but I ran into some issues with the size of the image. I resourced to use Handlebars in the template file; this allowed me to define the image size.

**Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart. Notify the user that the product has been added.**

   I looked up some of the information about cart documentation. There was a useful tutorial in the documentation that helped me with multiple API calls (https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview). I modified all the calls to the API to utilize async and await.

   I kept the notification part for last, along with modifying the cart display when an item is added or removed without needing to refresh the page.

   I also noticed that the code would need to be modified if products with variations are considered, since the way I obtained the productID is by looking into the product figure caption.
    
**If the cart has an item in it - show a button next to the Add All To Cart button which says Remove All Items. When clicked it should clear the cart and notify the user.**
    
   I went back and forth over the best way to implement this. I considered deleting the whole cart as this seemed to be the faster option; however, not knowing how the rest of the page operates or whether this would cause any issues to any other parts of the store, I decided to go with deleting the items individually. I decided to leave both codes on the page and only comment out the code for deleting the cart.
    
   At this point, I backtracked and utilized the Cornerstone theme's modal to create two notifications: one that is displayed when the user adds all the items in the page to the cart, and another that is displayed when the user removes all items from the cart. I utilized the en.json file to define all the text for the buttons and the notifications.

 **Bonus**
 
**If a customer is logged in - at the top of the category page shows a banner that shows some customer details (i.e. name, email, phone, etc). This should utilize the data that is rendered via Handlebars on the Customer Object.**

   I used Handlebars to check if the customer was logged in or not, and used the config.json file to get the colors already defined by the theme. I used filter properties to properly style the envelope SVG and the phone file.

   The biggest hurdle was figuring out the file structure and the way Stencil works. Having used a lot of React recently, I am used to using JSX within my JS files.
