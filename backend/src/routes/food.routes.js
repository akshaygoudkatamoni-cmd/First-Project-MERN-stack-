const express = require('express');
const foodController = require('../controllers/food.contorller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer'); // to read a file from frontend.

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(), // store the file in memory
})


/* POST /api/food [protected] */
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
    foodController.createFood);


/* GET /api/food [protected] */
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)


router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood);

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood);

router.get('/saved',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFoodItems
);

module.exports = router;