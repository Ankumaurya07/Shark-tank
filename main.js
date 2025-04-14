
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let productdata = []

function fatchdata()
{
    fetch("http://localhost:3000/pitches")
    .then((res)=>res.json())
    .then((data)=>{
        cardlist(data)
        productdata = data
    })
    .catch((err)=>console.log(err))
}
fatchdata()

function cardlist(data)
{
    const store = data.map((el)=>card(el.id,el.image,el.founder,el.price,el.category))
    mainSection.innerHTML =store.join("")
}

function card(id,image,price,founder,category,title)
{
    let singelcard = `<div class="card" data-id=${id}>
      <div class="card-img">
        <img src=${image} alt="">
      </div>
      <div class="card-body">
        <h4 class="card-t">${title}</h4>
        <p class="card-p">founder : ${founder}</p>
        <p class="card-ca">${category}</p>
        <p class="card-pr">${price}</p>
        <a href="#" data-id=${id} class="card-li">Edit</a>
        <button data-id=${id} class="card-b">Delete</button>
      </div>
    </div>`

    return singelcard
}

// add new pitch

pitchCreateBtn.addEventListener("click",()=>
{
    let product = {
        title:pitchTitleInput.value,
        image:pitchImageInput.value,
        price:pitchPriceInput.value,
        category:pitchCategoryInput.value,
        founder:pitchfounderInput.value
    }
    fetch("http://localhost:3000/pitches",{
        method : "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(product)
    }).then(res => res.json())
    .then(data =>{
        console.log(data)
        alert("product added")
    })
    .catch(error =>{
        console.log(error)
        alert("something wrong")
    });
})

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-b"))
    {
        Deletepro(e.target.dataset.id)
    }
})

function Deletepro(id)
{
    fetch(`http://localhost:3000/pitches/${id}`,{
        method:"DELETE",
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("DELETED....")
        console.log(data)
    })
    .catch((err)=>console.log(err))
}

//catogery filter

filterFood.addEventListener("click",()=>{
    let filterdata =  productdata.filter((el)=>el.category === "Food")  
    console.log(filterdata)
    cardlist(filterdata)
})
filterElectronics.addEventListener("click",()=>{
    let filterdata =  productdata.filter((el)=>el.category === "Electronics")  
    console.log(filterdata)
    cardlist(filterdata)
})
filterPersonalCare.addEventListener("click",()=>{
    let filterdata =  productdata.filter((el)=>el.category === "Personal Care")  
    console.log(filterdata) 
    cardlist(filterdata)
})

// filter price

sortAtoZBtn.addEventListener("click",()=>{
    const sortAtoZBtn = productdata.sort((a,b)=>a.price-b.price)
    cardlist(sortAtoZBtn)
})
sortZtoABtn.addEventListener("click",()=>{
    const sortAtoZBtn = productdata.sort((a,b)=>b.price-a.price)
    cardlist(sortAtoZBtn)
})

// update pitch

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-li"))
    {
        let id = e.target.dataset.id
        fillform(id)
    }
})
function fillform(id)
{
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        updatePitchIdInput.value = data.id
        updatePitchTitleInput.value = data.title
        updatePitchImageInput.value = data.image
        updatePitchCategoryInput.value = data.category
        updatePitchPriceInput.value = data.price
        updatePitchfounderInput.value = data.founder
    })
    .catch((err) => console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    let updateprodata = {
        title:updatePitchTitleInput.value,
        categor:updatePitchCategoryInput.value,
        id:updatePitchIdInput.value,
        price:updatePitchPriceInput.value,
        founder:updatePitchfounderInput.value,
        image:updatePitchImageInput.value

    }

    fetch(`http://localhost:3000/pitches/${updateprodata.id}`,{

        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(updateprodata)

    }).then((res)=>res.json())
    .then((data)=>{
        alert(" data updated.....")
    })
    .catch((err)=>console.log(err))
})

