const router = require('express').Router()
const orderUserdatas = require('../Models/OrderUserSchema')

//post order user data
router.post('/postOrderUserData', async (req, res) => {
    console.log('order-user-data', req.body);
    try {
        const User = await orderUserdatas({
            address: req.body.address,
            pincode: req.body.pincode,
            city: req.body.city,
            phone: req.body.phone,
            profileid: req.body.loginId
        })
        console.log('usr-ordr', User);

        const SavedData = await User.save()
        res.status(200).json(SavedData)
        console.log('order-SavedData', SavedData);
    } catch (error) {
        res.status(400).json(error)
    }
})

//get user order data
router.get('/getOrderUserData/:id', async (req, res) => {
    console.log('getuserid', req.params.id);
    console.log('7777777777',req.body);
    try {
        const orderedUser = await orderUserdatas.find({ profileid: req.params.id })
        console.log('orderedUser', orderedUser);
        res.status(200).json(orderedUser)
    } catch (error) {
        res.status(400).json(error)
    }
})

//to update/change user data (ordered)
router.put('/updateOrderUerData/:id', async (req, res) => {
    // console.log('5678',req.params.id);
    try {
        console.log('ioioio', req.params.id);
        console.log('yoyoyo', req.body);
        const updateOrdered = await orderUserdatas.findByIdAndUpdate(req.params.id, {
            $set: { address: req.body.address, pincode: req.body.pincode, city: req.body.city, phone: req.body.phone }
        },{new:true})
console.log("****",updateOrdered);
    } catch (error) {
        res.status(400).json(error)
    }
});


module.exports = router