const router = require('express').Router()
const buydata = require('../Models/BuySchema')

//to post datas when clicking buynow button
router.post('/buypost', async (req, res) => {
    console.log('buydataa', req.body);
    try {
        const buyPost = await buydata({
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            // productid: req.body.loginId
        })
        console.log('buyydataaas', buyPost);

        const savedPosts = await buyPost.save()
        res.status(200).json(savedPosts)
        console.log('savedpostss', savedPosts);

    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/buyget/:id', async (req, res) => {
    console.log('-----', req.params.id);
    console.log("*********", req.body);
    try {
        const buyGet = await buydata.findOne(req.params.id)
        console.log('buyGet', buyGet);
        res.status(200).json(buyGet)
    } catch (error) {
        res.status(400).json(error)
    }
})



router.get('/buydataget/:id', async (req, res) => {
    console.log(req.params.id);
    console.log("+*+*+*+*", req.body);
    try {
        const BuyGet = await buydata.findById(req.params.id)
        console.log('buygetdataaaa', BuyGet);
        res.status(200).json(BuyGet)

    } catch (err) {
        res.status(400).json(err)

    }
})
module.exports = router
