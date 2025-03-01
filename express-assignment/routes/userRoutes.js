const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public
 * @query role - Filter users by role
 */
router.get('/', getAllUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Public
 * @param id - User ID
 */
router.get('/:id', getUserById);

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 * @body name - User name
 * @body email - User email
 * @body role - User role 
 */
router.post('/', createUser);

/**
 * @route PUT /api/users/:id
 * @desc Update user by ID
 * @access Public
 * @param id - User ID
 * @body name - User name 
 * @body email - User email 
 * @body role - User role 
 */
router.put('/:id', updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete user by ID
 * @access Public
 * @param id - User ID
 */
router.delete('/:id', deleteUser);

module.exports = router;