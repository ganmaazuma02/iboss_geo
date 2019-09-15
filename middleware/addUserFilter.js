// Filter based on user role
// If user is admin, user can add any role
// else if user is manager, user can only add employee role
// employee cannot add any user
const config = require('config');
const jwt = require('jsonwebtoken');

function addUserFilter(req, res, next) {

    const { decoded } = res.locals;

    if (decoded.role === "admin" && role[decoded.role].find((url) => { return url == req.originalUrl })) {
        req.user = decoded;
        next();
    }
    else if (decoded.role === "manager" && role[decoded.role].find((url) => { return url == req.originalUrl })) {
        if (req.body.role !== "employee") {
            return res.status(401).json({ msg: `Access Denied: You dont have correct privilege to add users with ${req.body.role}` }); // Manager can only add employee
        }
        req.user = decoded;
        next();
    }
    else {
        return res.status(401).json({ msg: 'Access Denied: You dont have correct privilege to perform this operation' });
    }
}

module.exports = addUserFilter;