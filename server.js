if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}


const express = require ("express");
const app = express();
app.set('view-engine', 'ejs')
const nodemailer = require("nodemailer")
const bcrypt = require ("bcrypt");
const passport = require ("passport")
const flash = require ("express-flash")
const session = require ("express-session")

const initializePassport = require ('./passport-config')
initializePassport(
passport,
 email => users.find(user => user.email === email),

 id => users.find(user => user.id === id)
)


const PORT = process.env.PORT || 5000;

// Middleware 


app.use(express.static('public'));
app.use(express.json('public'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/main.html')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
       return next() 
    }
    res.redirect('/login')
}



//Login

const users = []

app.get('/login', (req, res)=>{
    res.render('login.ejs')

   })

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res)=>{
    res.render('register.ejs')

   })

app.post('/register', async (req, res)=>{
    try {
const hashedPassowrd = await bcrypt.hash(req.body.password, 10)
users.push({
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassowrd,
})
res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
    
     })   





// Acceso desde el back a las distintas direcciones
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/main.html')
   })


app.get('/contactUs', (req, res)=>{
 res.sendFile(__dirname + '/public/contactform.html')
})

app.get('/hotDeals', (req, res)=>{
    res.sendFile(__dirname + '/public/hotDeals.html')
   })

 
   

   


// implementacion del nodemailer

app.post('/contactUS', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
       service:'hotmail',
        secure: false,
        auth: {
           user: 'joacocra99@hotmail.com',
           pass: 'TVtvgood094984893!'
            

            
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'joacocra99@hotmail.com',
        subject: `message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else {
            res.send('succeess')
        }
    })
    

})

app.listen(PORT, ()=>{

    console.log(`Server running on port ${PORT}`)
})


// Productos de Hotsales creados desde js
app.get('/products', (req, res)=>{
    res.send(products)
   })



const products = [
    {
        id: 1,
        name: "HP OMEN - 16.1 Laptop  Intel Core i7",
        price: "1,499.99",
        image: "imagen/1.jpg",
        stock: 20
},

{
    id: 2,
    name: "Microsoft 365 Personal",
    price: "87.49",
    image: "imagen/2.jpg",
    stock: 20
},

{
    id: 3,
    name: "CORSAIR  RM Series 650W",
    price: "124.99",
    image: "imagen/3.jpg",
    stock: 20
},

{
    id: 4,
    name: "CORSAIR - RM Series 750W",
    price: "30.99",
    image: "imagen/4.jpg",
    stock: 20
},

{
    id: 5,
    name: "HP 65XL High-Yield Ink Cartridge",
    price: "124.99",
    image: "imagen/5.jpg",
    stock: 20
},

{
    id: 6,
    name: "HP DeskJet 3755 Wireless",
    price: "89.99",
    image: "imagen/6.jpg",
    stock: 20
},

{
    id: 7,
    name: "MSI  B550 GAMING PLUS",
    price: "144.99",
    image: "imagen/7.jpg",
    stock: 20
},

{
    id: 8,
    name: "HP 65XL High-Yield Ink Cartridge",
    price: "124.99",
    image: "imagen/5.jpg",
    stock: 20
},

{
    id: 9,
    name: "Microsoft 365 Personal",
    price: "87.49",
    image: "imagen/2.jpg",
    stock: 20
},

]








