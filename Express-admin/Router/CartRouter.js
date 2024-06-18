const router = require('express').Router()
const cartData = require('../Models/CartSchema')

//add cart
router.post('/postcart', async (req, res) => {
    try {
        console.log('cartdata', req.body);
        const newCart = new cartData({
            title: req.body.title,
            price: req.body.price,
            itemQuantity: req.body.itemQuantity,
            image: req.body.image,
            mrp:req.body.mrp,
            orderId:req.body.orderId

        })

        const SaveCart = await newCart.save()
        res.status(200).json(SaveCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//to get cart
router.get('/getcart/:id', async (req, res) => {
    console.log("haiii");
    console.log('cartget', req.body);
    console.log("idd",req.params.id);
    try {
        const CartGetData = await cartData.find({orderId:req.params.id})
        console.log('getCartData', CartGetData);
        res.status(200).json(CartGetData)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete cart
router.delete('/deletecart/:id', async (req, res) => {
    console.log('cart-delete', req.params.id);
    try {
        const CartDeleteData = await cartData.findByIdAndDelete(req.params.id)
        console.log('CartDeleteData', CartDeleteData);
    } catch (error) {
        res.status(500).json(error)
    }
})

// for quantity
 router.put('/updatequantity/:id',async(req,res)=>{
    console.log('quantity',req.params.id);
    try {
        const quantityData = await cartData.findByIdAndUpdate(
            req.params.id,
            {
                $set:{itemQuantity:req.body.Quantity},
            },
            {new:true}
        );
        return res.status(200).json(quantityData)
    } catch (error) {
        res.status(500).json(error)
    }
 })
module.exports = router