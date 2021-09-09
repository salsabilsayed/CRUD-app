const productNameInput = document.querySelector('#name');
const productPriceInput = document.querySelector('#price');
const productCategoryInput = document.querySelector('#category');
const searchInput = document.querySelector('#searchInput');
const addBtn = document.querySelector('.add');
const deleteBtn = document.querySelector('.delete');
const updateBtn = document.querySelector('.update');
const tableBody = document.querySelector('tbody');

let currentIndex;
let productsList;

if(localStorage.getItem('productsList') != null){
    productsList = JSON.parse(localStorage.getItem('productsList'));
    displayProducts();
}else{
    productsList = [];
}

function addProduct(){
    if(addBtn.innerHTML == 'Update'){
        addAfterUpdate(currentIndex);
        addBtn.innerHTML = 'Add Product';
    }
    else{
        const product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value
        }
    
        productsList.push(product);
        localStorage.setItem('productsList',JSON.stringify(productsList));
        console.log(productsList);
    
        displayProducts();
        clearInput();
    }
    
}

addBtn.addEventListener('click', addProduct);


function displayProducts(){

    let container = ``;
    for(i=0 ; i < productsList.length ; i++){
        container += `
        <tr>
            <td>${productsList[i].name}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].category}</td>
            <td><button type='button' class='update btn' onClick='updateProduct(${i})'>update</button></td>
            <td><button type='button' class='delete btn' onClick='deleteProduct(${i})'>delete</button></td>
        </tr>
        `
    }

    tableBody.innerHTML = container;
}


function clearInput(){
    productNameInput.value= '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
}


function search(event){
    
    let container = ``; 
        for(i=0 ; i < productsList.length ; i++){
        if(productsList[i].name.toLowerCase().includes(event.key)){
            container += `
            <tr>
            <td>${productsList[i].name.toLowerCase()}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].category}</td>
            <td><button type='button' class='update btn' onClick='updateProduct(${i})'>update</button></td>
            <td><button type='button' class='delete btn' onClick='deleteProduct(${i})'>delete</button></td>
            </tr>
            `
        }
    }

    tableBody.innerHTML = container;
}


searchInput.addEventListener('keyup',search);


function deleteProduct(i){
    productsList.splice(i,1);
    localStorage.setItem('productsList',JSON.stringify(productsList));
    displayProducts();
}

function updateProduct(i){
    currentIndex = i;
    productNameInput.value = productsList[i].name;
    productPriceInput.value = productsList[i].price;
    productCategoryInput.value =productsList[i].category; 

    addBtn.innerHTML = 'Update';
}

function addAfterUpdate(currentIndex){
    const newProduct={
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value
    }
    productsList.splice(currentIndex,1,newProduct);
    displayProducts();
    localStorage.setItem('productsList',JSON.stringify(productsList));
    clearInput();
}