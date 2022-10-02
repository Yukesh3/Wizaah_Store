
/*------------------------- For Menu Toggle -------------------------*/

let menuView = document.getElementById('sectionMenu')
menuView.style.display='none';

function toggleMenu(){
    if(menuView.style.display=='none'){
        menuView.style.display='block';
    }else{
        menuView.style.display='none';
    }
}


/*------------------------- For Cart -------------------------*/

const imageSelect=document.querySelectorAll('.imageSelect')

var products=[
    {
        name:'Top',
        price: 899,
        inCart:0,
    },
    {
        name:'Shoe',
        price: 1500,
        inCart:0,

    },
    {
        name:'T_Shirt',
        price: 1000,
        inCart:0,

    },
    {
        name:'Jean',
        price: 2000,
        inCart:0,

    },
    {
        name:'Hoodie',
        price: 2500,
        inCart:0,

    }
]

for(i=0;i<imageSelect.length;i++){

   let items=products[i];

   imageSelect[i].addEventListener('click',()=>{
        cartNumber(items)
        totalCost(items)
    })
    
}



function onload(){
    let productNumber=localStorage.getItem('cartNumber');

    if(productNumber) {
        document.querySelector('.cartIcon span').textContent=productNumber;
    }
}

function cartNumber(items){
  
    let productNumber=localStorage.getItem('cartNumber')
    productNumber=parseInt(productNumber);

    if(productNumber) {
        localStorage.setItem('cartNumber',productNumber+1);
        document.querySelector('.cartIcon span').textContent=productNumber+1;
    }
    else{
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.cartIcon span').textContent=1;
    }

    setItems(items)
}


function setItems(items) {
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[items.name] == undefined){
        cartItems={
            ...cartItems,
            [items.name]:items
        }
        }
        cartItems[items.name].inCart +=1; 
    }
    else{

        items.inCart = 1;
        cartItems={
            [items.name]:items
        }
    }

  
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}


function totalCost(items){
    
    let cost=localStorage.getItem('totalCost');
   
    if(cost != null){
        cost=parseInt(cost);
        localStorage.setItem('totalCost',cost += items.price);
    }else{
        localStorage.setItem('totalCost',items.price);
    }
}


function displayCart(){

    let cartItems=localStorage.getItem('productsInCart');
    cartItems =JSON.parse(cartItems);

    let checkTableRow= document.getElementById('cartRow');
    let cartTotal =localStorage.getItem('totalCost');
    
    if(cartItems){
        checkTableRow.innerHTML='';
    
        Object.values(cartItems).map(item=>{
        
            checkTableRow.innerHTML +=`
            <td class='tdImgWithRemove'>
               <p class='nameOfItem'>${item.name}<p>
               <img src="./Assets//images/products/${item.name}.jpg">
               <p class='remove'>Remove</p>
            </td>

            <td class='tdNo'>${item.inCart}</td>
            <td class='tdNo'>${item.price}</td>
            <td class='tdNo'>${item.inCart* item.price}</td>`
        })

             checkTableRow.innerHTML +=
            `<td class='tdBor'></td>
             <td class='tdBor'></td>
             <td class='tdBor'>Cart Total</td>
             <td class='tdBor'>${cartTotal}</td>`

    }

    deleteButtons()
}


function deleteButtons() {

    let deleteButtons = document.querySelectorAll('.remove');
    let itemNames=document.querySelectorAll('.nameOfItem');
    let productNumbers = localStorage.getItem('cartNumber');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);
 
    let productName;
    let itemNamesInProducts=products.map(i=>(i.name))
 
    for(let i=0; i < deleteButtons.length; i++) {
      
        deleteButtons[i].addEventListener('click', () => {
       
           let nameInsideRow= itemNames[i].textContent
           let nameMatch=itemNamesInProducts.find(i=> i == nameInsideRow)
           productName = nameMatch;
   
            localStorage.setItem('cartNumber', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onload()
        })
    }
}

onload()
displayCart()







