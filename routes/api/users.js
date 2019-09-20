const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const addUserFilter = require('../../middleware/addUserFilter');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');
const Location = require('../../models/Location');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', auth, addUserFilter, (req, res) => {
    const { name, national_id, email, password, role, phone_number } = req.body;

    // Simple validation
    if (!name || !national_id || !email || !password || !role || !phone_number) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                national_id,
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
                                { id: user.id, role: user.role, national_id: user.national_id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err) => {
                                    if (err) throw err;
                                    res.json({
                                        //token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            national_id: user.national_id,
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


// @route   GET api/users/:id
// @desc    Get one employee with location details
// @access  Private, Only admin and manager
router.get('/:id', auth, (req, res) => {

    const { decoded } = res.locals;

    User.findOne({ national_id: req.params.id })
        .select('-password')
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Cannot find user' });

            if (decoded.role === "employee" && user.national_id !== decoded.national_id) return res.status(401).json({ msg: 'Access Denied: You dont have correct privilege to perform this operation' });

            if (decoded.role === "manager" && (user.role === "manager" || user.role === "admin")) return res.status(401).json({ msg: 'Access Denied: You dont have correct privilege to perform this operation' });

            Location.find({ user_national_id: req.params.id }).sort({ update_date: -1 }).limit(10)
                .then(locs => res.json({
                    user: user,
                    latest_locations: locs
                }))
        });
});


module.exports = router;