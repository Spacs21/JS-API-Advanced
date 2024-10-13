const wrapper = document.querySelector(".wrapper")
const loading = document.querySelector(".loading")
const btn = document.querySelector(".btn")
const category = document.querySelector(".category")
const All = document.querySelector(".All")
const skeleton = document.querySelector('.skeleton-loader');

const BASE_URL = "https://dummyjson.com"

let limitCount = 10
let offset = 1

async function getData(endpoint, count){
    const respone = await fetch(`${BASE_URL}/${endpoint}?limit=${limitCount * count}`)
    respone
    .json()
    .then((res) => createProduct(res))
    .catch((err) => console.log(err))
    .finally(()=>{
        skeleton.style.display = "none";
    })
}
getData("products", offset)

function createProduct(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.products.forEach(product => {
        const card = document.createElement("dov")
        card.className = "card"
        card.innerHTML = `
            <img src="${product.images[0]}" alt="">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <strong>$${product.price}</strong>
            <button>Buy Now</button>
        `
        wrapper.appendChild(card)
    });
}

btn.addEventListener("click", ()=>{
    offset++
    getData("products", offset)
})



window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(48, 51, 107, 0.8)";
    } else {
      navbar.style.backgroundColor = "rgba(48, 51, 107, 1)"; 
    }
});

async function getCategory(endpoint){
    const respone = await fetch(`${BASE_URL}/${endpoint}`)
    respone
        .json()
        .then(res => createCategory(res))
        .catch((err) => console.log(err))
}
getCategory("products/category-list")

function createCategory(data){
    data.forEach(item => {
        const liEl = document.createElement("li")
        const dataEl = document.createElement("data")
        liEl.className = "category__item"
        
        dataEl.innerHTML = item
        dataEl.setAttribute("value", `/category/${item}`)

        dataEl.addEventListener("click", (e) => {
            getData(`products${e.target.value}`, offset)
        })

        liEl.appendChild(dataEl)
        category.appendChild(liEl)
    });
}

All.addEventListener("click", ()=>{
    if (All.getAttribute('value') === "") {
        getData("products", offset)
    }
})

const burgerMenu = document.getElementById('burger-menu');
const sidebar = document.getElementById('sidebar');
const navbar = document.querySelector('.navbar');

burgerMenu.addEventListener('click', () => {
    sidebar.style.left = sidebar.style.left === '0px' ? '-1000px' : '0px';
    navbar.classList.toggle('active');
});