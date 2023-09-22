const multer = require('multer');
const express = require('express');

const router = express.Router();

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads') },
    filename: (req, file, cb) => { cb(null, file.originalname) }
})

const uploader = multer({storage : myStorage});

router.post('/uploadfile', uploader.single('myfile'), (req, res) => {
    res.json({status : 'success'});
});

module.exports = router;