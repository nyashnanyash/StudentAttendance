const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateAccessToken } = require('../utils/authUtils');

const login = (req, res) => {
    const { user_name, password } = req.body;
    
    // Check if user_name and password are provided
    if (!user_name || !password) {
        return res.status(400).json({ message: 'user_name and password are required' });
    }

    // Retrieve user from database
    userModel.getUserByuser_name(user_name, async (error, user) => {
        if (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid user_name or password' });
        }

        try {
            // Compare hashed password with the provided password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Check if password is valid
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid user_name or password' });
            }

            // Generate access token
            const accessToken = generateAccessToken(user.id);

            // Send access token in JSON response
            res.status(200).json({ accessToken });
        } catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
};

module.exports = { login };
