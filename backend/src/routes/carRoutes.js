const express = require('express');
const router = express.Router();
const controller = require('../controllers/carController');

router.get('/', controller.getAllCars);
router.get('/:id', controller.getCar);
router.post('/', controller.createCar);
router.put('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

module.exports = router;
