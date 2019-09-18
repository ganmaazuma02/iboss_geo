const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Location = require('../../models/Location');

// @route   POST api/locations
// @desc    Add new location
// @access  Private
router.post('/', auth, (req, res) => {
    const { decoded } = res.locals;

    const { latitude, longitude, current_task } = req.body;

    //if (user_national_id !== decoded.national_id) return res.status(401).json({ msg: 'You cannot add new locations to somebody else' });
    //console.log(decoded);

    const newLocation = new Location({
        user_national_id: decoded.national_id, // Using the id from the request token
        latitude,
        longitude,
        current_task
    });

    newLocation.save().then(location => res.json(location));


});

module.exports = router;