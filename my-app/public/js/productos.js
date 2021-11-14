function display(productList) {
    let productsHTML = '';

    //De esta forma, genero los elementos desde el back con js y no los tengo hardcodeados en el html
    productList.forEach(element => {
        productsHTML +=
        `<div>
            <img src="${element.image}" alt="">
            <h4>${element.name}</h4>
            <p>$${element.price}</p>
        </div>`
    });

    document.getElementById('page-content').innerHTML = productsHTML;
}



window.onload = async() => {
    console.log("Funciona")
const productList = await (await fetch("/products")).json();
console.log(productList);
display(productList);
}
