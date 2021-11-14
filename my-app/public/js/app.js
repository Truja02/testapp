

window.onload = async() => {
    console.log("funciona")
}

const contactform = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');


contactform.addEventListener('submit', (e)=>{

    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,

        }
        console.log(formData)

    

    let xhr = new XMLHttpRequest(); 
    xhr.open('POST' , '/contactUs');
    
    xhr.setRequestHeader('content-type', 'application/json');
    
    
xhr.send(JSON.stringify(formData));

   
})






