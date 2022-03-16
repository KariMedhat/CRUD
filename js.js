var nameInput = document.getElementById("name")
var priceInput = document.getElementById("price")
var categotyInput = document.getElementById("categoty")
var descInput = document.getElementById("desc")
var searchInput = document.getElementById("search");

var mainIndex = 0;

var productsList;
if (localStorage.getItem("productsList") != null) {
    productsList = JSON.parse(localStorage.getItem("productsList"));
    displayProducts(productsList);
} else {
    productsList = []
}


function addProduct() {
    var product = {
        pName: nameInput.value,
        pPrice: priceInput.value,
        pCategory: categotyInput.value,
        pDesc: descInput.value
    }

    if (document.getElementById("addBtn").innerHTML == "Add product") {
        productsList.push(product);
    } else {
        productsList.splice(mainIndex, 1, product);
        document.getElementById("addBtn").innerHTML = "Add product"
    }

    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProducts(productsList)
    clearInputs()
}

function displayProducts(anyArray) {
    var trs = "";
    for (var i = 0; i < anyArray.length; i++) {
        trs += `<tr>
                    <td>${i}</td>
                    <td>${anyArray[i].pName}</td>
                    <td>${anyArray[i].pPrice}</td>
                    <td>${anyArray[i].pCategory}</td>
                    <td>${anyArray[i].pDesc}</td>
                    <td>
                        <button onclick="editProduct(${i})" class="btn btn-info">Edit</button>
                    </td>
                    <td>
                        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                    </td>
                </tr>`
    }

    document.getElementById("tableBody").innerHTML = trs;

}

function clearInputs() {
    nameInput.value = "";
    priceInput.value = "";
    categotyInput.value = "";
    descInput.value = "";
}


function deleteProduct(i) {
    productsList.splice(i, 1);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProducts(productsList)
}

function editProduct(i) {
    nameInput.value = productsList[i].pName;
    priceInput.value = productsList[i].pPrice;
    categotyInput.value = productsList[i].pCategory;
    descInput.value = productsList[i].pDesc;

    mainIndex = i;

    document.getElementById("addBtn").innerHTML = "Update product"
}


function searchProduct() {
    var trs = "";
    var wantedArray = [];
    for (var i = 0; i < productsList.length; i++){
        if(productsList[i].pName.toLowerCase().includes(searchInput.value.toLowerCase())){
           wantedArray.push(productsList[i]);
        }
    }

    displayProducts(wantedArray)
}