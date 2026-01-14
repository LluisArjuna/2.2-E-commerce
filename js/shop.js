import { products } from "../js/products.js";


let cart = JSON.parse(localStorage.getItem("cartt")) || [];
const saveCart = (cart) => localStorage.setItem("cartt", JSON.stringify(cart));


const getProductById = (id) =>
  products.find(p => p.id == id);

const getCartItemById = (id) =>
  cart.find(p => p.id == id);

const applyPromotionsCart = () =>  {
    cart.forEach(element => {
        let subtotal = element.price * element.quantity;
        if (element.offer && element.offer.number <= element.quantity) {
            const discount = subtotal * element.offer.percent / 100;
            element.subtotalWithDiscount = subtotal - discount;
        } else {
            element.subtotalWithDiscount = subtotal;
        }
    })
}

const calculateTotal = () =>  {
    let total = 0;
    cart.forEach(element => {
        total += element.subtotalWithDiscount;
    });
    return total;
}

const calculateNProducts = () =>  {
    let total = 0;
    cart.forEach(element => {
        total += element.quantity;
    });
    return total;
}


const printCart = () => {
    const table = document.getElementById("cart_list");
    table.innerHTML = "";

    cart.forEach(element => {
        const tr = document.createElement("tr");

        const name = document.createElement("th");
        name.innerHTML = element.name;

        const price = document.createElement("td");
        price.innerText = `$${element.price}`;      

        const quantity = document.createElement("td");  
        quantity.innerText = element.quantity;

        const subtotal = document.createElement("td");      
        subtotal.innerText = `$${element.subtotalWithDiscount}`;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "-";
        deleteButton.addEventListener("click", () => removeFromCart(element.id));

        const addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.addEventListener("click", () => buy(element.id));

        tr.appendChild(name);
        tr.appendChild(deleteButton);
        tr.appendChild(price);
        tr.appendChild(addButton);
        tr.appendChild(quantity);
        tr.appendChild(subtotal);
        table.appendChild(tr);        
    });    
}


const buy = (id) => {
    const cartItem = getCartItemById(id);
    if (cartItem == null) {
        const product = getProductById(id);
        cart.push({...product, quantity: 1});
    } else {
        cartItem.quantity += 1;
    }
    applyPromotionsCart();
    saveCart(cart);
    totalPrice.innerHTML = calculateTotal();
    nProducts.innerHTML = calculateNProducts();
    printCart();
}

const cleanCart = () =>  {
    cart.splice(0, cart.length);
    saveCart(cart);
    totalPrice.innerHTML = 0;
    nProducts.innerHTML = 0;
    printCart();
}

const removeFromCart = (id) => {
    const cartItem = getCartItemById(id);
    if (cartItem.quantity > 1) {
        cartItem.quantity -=1;
    } else {
        const index = cart.findIndex((product) => product.id == id);
        cart.splice(index, 1);
    }  

    applyPromotionsCart();
    saveCart(cart)
    totalPrice.innerHTML = calculateTotal();
    nProducts.innerHTML = calculateNProducts();
    printCart()
}

document.getElementById("checkout").classList.toggle("disabled", cart.length === 0);

let totalPrice = document.getElementById("total_price");
totalPrice.innerHTML = calculateTotal();

let nProducts = document.getElementById("count_product");
nProducts.innerHTML = calculateNProducts();

document.querySelectorAll("button.add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        buy(button.dataset.productId);
    })
});

document.getElementById("clean-cart").addEventListener("click", () => {
    cleanCart();
});

document.querySelector("button.cart-button").addEventListener("click", () => {
    printCart();
});