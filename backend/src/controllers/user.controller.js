const userModel = require("../models/user.model");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// Get current user from JWT token
const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ 
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch current user', error: error.message });
    }
};

module.exports = { getAllUsers, getUserById, getCurrentUser };