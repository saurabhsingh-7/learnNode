const express = require('express');
const router = express();
 router.use(express.json());

const path = require('path');
const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    }
, filename: function (req, file, cb) {
   const name = Date.now() + '-' + file.originalname;    
        cb(null, name);
    }
});

const upload = multer({ storage: storage });
const userController = require('../controllers/userController');

router.post('/register', upload.single('image'), userController.register);

 module.exports = router;
