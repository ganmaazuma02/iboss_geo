const config = require('config');
const jwt = require('jsonwebtoken');
const role = require('./role');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token if there is a token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        if (role[decoded.role].find((url) => { return url == req.originalUrl })) {
            // Add user from payload if the user's role authorized to access
            req.user = decoded
            next();
        } else {
            return res.status(401).json({ msg: 'Access Denied: You dont have correct privilege to perform this operation' });
        }


    } catch (ex) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;