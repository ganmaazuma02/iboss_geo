const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password, role, phone_number } = req.body;

    // Simple validation
    if (!name || !email || !password || !role || !phone_number) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password,
                role,
                phone_number
            });

            // Create salt & hash for password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id, role: role.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            role: user.role,
                                            phone_number: user.phone_number
                                        }
                                    });
                                }
                            )
                        });
                })
            });
        })
});


module.exports = router;