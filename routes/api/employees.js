const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   GET api/employees
// @desc    Get all employees
// @access  Private, Only admin and manager
router.get('/', auth, (req, res) => {

    const { decoded } = res.locals;

    if (decoded.role === "employee") return res.status(401).json({ msg: 'Access Denied: You dont have correct privilege to perform this operation' });

    User.find({ role: "employee" })
        .select('name national_id')
        .then(users => {
            if (!users) return res.status(400).json({ msg: 'No employees registered' });

            res.json(users)
        });
});

module.exports = router;