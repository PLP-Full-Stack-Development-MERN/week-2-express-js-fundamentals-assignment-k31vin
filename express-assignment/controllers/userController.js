let users = [
    { id: 1, name: 'Dedan Okware', email: 'Dedan@assignments.org', role: 'user' },
    { id: 2, name: 'Jane Okello', email: 'jane@expressjs.com', role: 'admin' },
    { id: 3, name: 'John Ouma', email: 'Ouma@gmail.com', role: 'user' },
    { id: 4, name: 'Kelvin KK', email: 'Kelvin@gmail.com', role: 'admin' },
    { id: 5, name: 'Moses K', email: ' Moses@gmail.com', role: 'user' }

    ];

/**
 * Get all users
 * @param {Object} req 
 * @param {Object} res 
 */
const getAllUsers = (req, res) => {
    // Handle query parameters for filtering
    const { role } = req.query;
    
    if (role) {
    const filteredUsers = users.filter(user => user.role === role);
    return res.json(filteredUsers);
    }
    
    res.json(users);
};

/**
 * Get user by ID
 * @param {Object} req 
 * @param {Object} res 
 */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (!user) {
    return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
};

/**
 * Create a new user
 * @param {Object} req 
 * @param {Object} res 
 */
const createUser = (req, res) => {
    const { name, email, role } = req.body;
    
    // Validate required fields
    if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Generate new ID for user
    const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    
    const newUser = {
    id,
    name,
    email,
    role: role || 'user' // Default role if not provided
    };
    
    users.push(newUser);
    
    res.status(201).json(newUser);
};

/**
 * Update user by ID
 * @param {Object} req 
 * @param {Object} res 
 */
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
    }
    
    const { name, email, role } = req.body;
    
    // Check if email is already in use by another user
    if (email && email !== users[userIndex].email && 
        users.some(user => user.email === email && user.id !== id)) {
    return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Update user properties
    users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role
    };
    
    res.json(users[userIndex]);
};

/**
 * Delete user by ID
 * @param {Object} req 
 * @param {Object} res 
 */
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({ message: 'User deleted successfully', user: deletedUser });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};