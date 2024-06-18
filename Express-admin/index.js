const express = require('express')
const app = express()  //used to define routes and configure the server.
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())
dotenv.config()

//Application level middle ware
// app.use(function(req,res,next){
//     console.log("all time first check");
//     next()
// })

const UseRoute = require('./Router/UserRouter')
const productRout = require('./Router/ProductRouter')
const EcomRoute = require('./Router/userEcomRouter')
const Cart = require('./Router/CartRouter')
const OrderUser = require('./Router/OrderUserRouter')
const BuyRoute = require('./Router/BuyRouter')
const ConfirmRoute = require('./Router/ConfirmOrderRoute')

mongoose.connect(process.env.project_key).then(() => {
    console.log('dataBase Connected');
}).catch((err) => {
    console.log(err.message);
})

app.use(express.json())
app.use('/api', UseRoute)
app.use('/api', productRout)
app.use('/api', EcomRoute)
app.use('/api', Cart)
app.use('/order', OrderUser)
app.use('/buy',BuyRoute)
app.use('/confirm',ConfirmRoute)
// app.use('/api',EcomRoute)

app.listen(7002, () => {
    console.log('server is connected');
})
