let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood = 'create';
let global;

//-------------------------------------------------------------
// get total
function updateTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(139, 2, 2)';
    }
}

//-------------------------------------------------------------
// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

create.onclick = function () {
    let newOp = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    if (mood === 'create') {
        if (newOp.count > 1) {
            for (let i = 0; i < newOp.count; i++) {
                dataPro.push(newOp);
            }
        } else {
            dataPro.push(newOp);
        }
    } else {
        dataPro[global] = newOp;
        mood = 'create';
        create.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};

//-------------------------------------------------------------
// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//-------------------------------------------------------------
// read
function showData() {
    updateTotal()
    let table = '';
    for (var i = 0; i < dataPro.length; i++) {
        let index = i + 1;
        table += `
            <tr>
                <td>${index}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})"  id="delete">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('deleteall');
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAllData()" >Delete All (${dataPro.length})</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}

showData();

//-------------------------------------------------------------
// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAllData() {
    localStorage.clear();
    dataPro = [];
    showData();
}

//-------------------------------------------------------------
// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    create.innerHTML = 'Update';
    updateTotal();
    mood = 'update';
    global = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}
//-------------------------------------------------------------
// scroll btn
let btn = document.getElementById('btn')
onscroll = function(){
    if (scrollY >= 500 ){
        btn.style.display = 'block'
    }else{ btn.style.display = 'none'}
    
}
btn.onclick = function(){
    scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}







