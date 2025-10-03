const express = require("express");
const controller = require("../controllers/books.controller");

const router = express.Router();

// Routes
router.get("/", controller.getAllBooks); 
// add custom header
// res.setHeader('x-piy', 'subh');
// return books from array to json format
    
router.get('/:id', controller.getBooksById);

router.post('/', controller.createBook);

router.delete('/:id', controller.deleteById);

module.exports = router;