const router = require('express').Router()
const confirm = require('../Models/ConfirmOrder')

router.post('/postOrderConfirm', async (req, res) => {
    console.log("**",req.body);
    console.log('sabr', req.body.orderId);
    console.log('data',req.body.datas);
    try {
        const DBdata = new confirm({
            orderId:req.body.orderId,
            products:req.body.datas,
        });
        // console.log('cartdata',cartData);
        const saveData = await DBdata.save()
        console.log('save-sabr', saveData);
        res.status(200).json(saveData)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/getOrderConfirm', async (req, res) => {
    
    try {
        const DBdata = await confirm.find()
        console.log('getOrder',DBdata);
        res.status(200).json(DBdata)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router