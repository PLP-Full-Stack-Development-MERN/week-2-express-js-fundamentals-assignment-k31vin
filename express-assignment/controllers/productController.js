    let products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'electronics', inStock: true },
        { id: 2, name: 'Headphones', price: 199.99, category: 'electronics', inStock: true },
        { id: 3, name: 'Book', price: 24.99, category: 'books', inStock: false },
        { id: 4, name: 'T-Shirt', price: 12.99, category: 'clothing', inStock: true },
        { id: 5, name: 'Shoes', price: 59.99, category: 'clothing', inStock: false },
        { id: 6, name: 'Smartphone', price: 399.99, category: 'electronics', inStock: true },
        { id: 7, name: 'Tablet', price: 299.99, category: 'electronics', inStock: false },
        { id: 8, name: 'Sunglasses', price: 49.99, category: 'accessories', inStock: true },
        { id: 9, name: 'Backpack', price: 34.99, category: 'accessories', inStock: true },
        { id: 10, name: 'Watch', price: 199.99, category: 'accessories', inStock: false }
    ];
    
    /**
     * Get all products
     * @param {Object} req 
     * @param {Object} res 
     */
    const getAllProducts = (req, res) => {
        // Handle query parameters for filtering
        const { category, inStock } = req.query;
        
        let filteredProducts = [...products];
        
        if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        if (inStock !== undefined) {
        const inStockBool = inStock === 'true';
        filteredProducts = filteredProducts.filter(product => product.inStock === inStockBool);
        }
        
        res.json(filteredProducts);
    };
    
    /**
     * Get product by ID
     * @param {Object} req 
     * @param {Object} res 
     */
    const getProductById = (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(product => product.id === id);
        
        if (!product) {
        return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    };
    
    /**
     * Create a new product
     * @param {Object} req 
     * @param {Object} res 
     */
    const createProduct = (req, res) => {
        const { name, price, category, inStock } = req.body;
        
        // Validate required fields
        if (!name || price === undefined) {
        return res.status(400).json({ error: 'Name and price are required' });
        }
        
        // Generate new ID
        const id = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
        
        const newProduct = {
        id,
        name,
        price: parseFloat(price),
        category: category || 'uncategorized',
        inStock: inStock !== undefined ? Boolean(inStock) : true
        };
        
        products.push(newProduct);
        
        res.status(201).json(newProduct);
    };
    
    /**
     * Update product by ID
     * @param {Object} req 
     * @param {Object} res 
     */
    const updateProduct = (req, res) => {
        const id = parseInt(req.params.id);
        const productIndex = products.findIndex(product => product.id === id);
        
        if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
        }
        
        const { name, price, category, inStock } = req.body;
        
        // Update product properties
        products[productIndex] = {
        ...products[productIndex],
        name: name || products[productIndex].name,
        price: price !== undefined ? parseFloat(price) : products[productIndex].price,
        category: category || products[productIndex].category,
        inStock: inStock !== undefined ? Boolean(inStock) : products[productIndex].inStock
        };
        
        res.json(products[productIndex]);
    };
    
    /**
     * Delete product by ID
     * @param {Object} req 
     * @param {Object} res
     */
    const deleteProduct = (req, res) => {
        const id = parseInt(req.params.id);
        const productIndex = products.findIndex(product => product.id === id);
        
        if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
        }
        
        const deletedProduct = products.splice(productIndex, 1)[0];
        
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    };
    
    module.exports = {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct
    };