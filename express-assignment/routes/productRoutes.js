const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 * @query category - Filter products by category
 * @query inStock - Filter products by availability (true/false)
 */
router.get('/', getAllProducts);

/**
 * @route GET /api/products/:id
 * @desc Get product by ID
 * @access Public
 * @param id - Product ID
 */
router.get('/:id', getProductById);

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Public
 * @body name - Product name
 * @body price - Product price
 * @body category - Product category 
 * @body inStock - Product availability 
 */
router.post('/', createProduct);

/**
 * @route PUT /api/products/:id
 * @desc Update product by ID
 * @access Public
 * @param id - Product ID
 * @body name - Product name 
 * @body price - Product price 
 * @body category - Product category 
 * @body inStock - Product availability 
 */
router.put('/:id', updateProduct);

/**
 * @route DELETE /api/products/:id
 * @desc Delete product by ID
 * @access Public
 * @param id - Product ID
 */
router.delete('/:id', deleteProduct);

module.exports = router;