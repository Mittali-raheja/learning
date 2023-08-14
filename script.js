let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listCards = JSON.parse(localStorage.getItem('cart')) || [];

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000,
        description:"The Rolex classic feminine watch par excellence. With its refined glamour, style and technical performance."
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000,
        description:"Khaki Field Mechanical Bronze Mechanical | 38mm | H69459530,"
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000,
        description:"Stainless Steel Watch of Titan with classy look | 38mm | H69459530,"
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.JPG',
        price: 123000,
        description:"Black & Gold Anthracite Dial Stainless Steel Strap Watch"
    },
 
];


function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
          <img src="image/${value.image}" onclick="showDescription(${key})">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>`
           if (listCards[key] != null) {
    newDiv.innerHTML += `
        <div>
            <button onclick="changeQuantity(${key}, ${listCards[key].quantity - 1})">-</button>
            <div class="count">${listCards[key].quantity}</div>
            <button onclick="changeQuantity(${key}, ${listCards[key].quantity + 1})">+</button>
        </div>`;
} else {
    newDiv.innerHTML += `<button onclick="addToCard(${key})">Add To Cart</button>`;
}
        list.appendChild(newDiv);
         
    });
    reloadCard();
}
initApp();
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}
function addToCard(key){
    if(listCards[key] == null){
     
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
   updateLocalStorage();
   window.location.reload();
}

function showDescription(key) {
    const product = products[key];

  
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description-page');
    descriptionDiv.innerHTML = `
      <img src="image/${product.image}">
      <div class="description">${product.description}</div>
      <button onclick="addToCard(${key})">Add To Cart</button>;
        <button onclick="goBack()">Go Back to Home</button>`
    
    document.body.innerHTML = '';
    document.body.appendChild(descriptionDiv);
}

function goBack(){
    window.location.reload();
}


function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
           
        if(value != null){
          totalPrice += value.price !== undefined ? value.price : 0;
        count = count + value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                     <button onclick="deleteItem(${key})">Delete</button> 
            </div>`;
                
                listCard.appendChild(newDiv);
        
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function deleteItem(key) {
    if (listCards[key] != null) {
        listCards[key].quantity = 0;
        delete listCards[key];
        reloadCard(); 

        updateLocalStorage(); 
        window.location.reload();
    }
}

function changeQuantity(key, quantity){
    if(listCards[key]!=null){

    
    if(quantity <= 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    updateLocalStorage();
    reloadCard();
    window.location.reload();
    
}
}
