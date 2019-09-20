const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// Item Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate the user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id, role: user.role, national_id: user.national_id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    national_id: user.national_id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    phone_number: user.phone_number,
                                    register_date: user.register_date
                                }
                            });
                        }
                    )
                })
        })
});


// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password') // excludes the password in the response
        .then(user => res.json(user));
});


module.exports = router;