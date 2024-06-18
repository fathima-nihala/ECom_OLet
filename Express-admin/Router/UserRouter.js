const router = require('express').Router()
const User = require('../Models/UserSchema')
const Jwt = require('jsonwebtoken')
const Crypto = require('crypto-js')
const { verifyTokenn, verifyTokenAndAuthorization } = require('../verifyTokn')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../admin-e-com/public/Profile');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

//admin post
router.post('/adminpost', upload.single('image'), async (req, res) => {
    console.log('@#@#-data', req.body);
    console.log('#$#-check', req.file); // Corrected line
    console.log('%%', req.file.originalname);

    const newUser = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        type: req.body.type,
        image: req.file.originalname,
        password: Crypto.AES.encrypt(req.body.password, process.env.Crypto_js).toString()
    });

    console.log("newuser", newUser);

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//admin login
router.post('/adminlogin', async (req, res) => {
    console.log('admin login', req.body);

    try {
        const DBdata = await User.findOne({ email: req.body.email })
        !DBdata && res.status(401).json({ response: 'please check your Email' })

        console.log('Backend Data', DBdata);

        const hashedPassword = Crypto.AES.decrypt(DBdata.password, process.env.Crypto_js)
        console.log('hashed password is', hashedPassword);

        const originalPassword = hashedPassword.toString(Crypto.enc.Utf8)
        console.log('Original password is', originalPassword);
        originalPassword != req.body.password && res.status(401).json({ response: "password and email doesnt match" })

        const accessToken = Jwt.sign({
            id: DBdata._id
        }, process.env.Jwt_sec,
            { expiresIn: '5d' })

        console.log("****", accessToken);
        const { password, ...others } = DBdata._doc
        // var Id=DBdata._id 
        res.status(200).json({ ...others, accessToken })
    } catch (err) {
        res.status(400)
    }
})

//admin get
router.get('/getadmindetails/:id', async (req, res) => {
    console.log('req in getadmin', req.params.id);
    try {
        const getres = await User.findById(req.params.id)
        console.log("ressvalue", getres);
        res.status(200).json(getres)
    } catch (err) {
        res.status(500).json(err)
    }
})


//admin update
router.put('/adminupdate', upload.single('image'), async (req, res) => {
    try {
        console.log('baby#', req.query.id);
        console.log('i dont', req.body);
        console.log("file", req.file);
        console.log("files", req.files);
        const name = req.body.firstname
        const email = req.body.email
        const images = req.file.originalname
        console.log('*********************', images);
        const updatedProfile = await User.findByIdAndUpdate(req.params.id, {
            $set: { image: images, firstname: name, email: email, }
        }, { new: true })
        console.log('Updated admin profile:', updatedProfile);
        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error('Error updating admin profile:', err);
        res.status(400).json({ message: err.message });
    }
})




//to get user details in admin user-page
// router.get('/Ecomgetmethod',async (req,res)=>{
//     try{
//         const datas=await User.find()
//         console.log(datas);
//         res.status(200).json(datas)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })


//to delete/remove user from admin user-page
// router.delete('/Ecomdelete/:id',async(req,res)=>{
//     // console.log('kfl',req.body);
//     try {
//        const res=await User.findByIdAndDelete(req.params.id)
//     //    console.log('res',res.body);
//     } catch (error) {
//         res.status(500).json(err)
//     }
// })

module.exports = router