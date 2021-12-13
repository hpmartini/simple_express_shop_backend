const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json('Token is invalid!');
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json('You\'re not authenticated');
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin === true) {
            next();
        } else {
            res.status(403).json('Permission denied.')
        }
    })
}

const verifyAdminRole = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin === true) {
            next();
        } else {
            res.status(403).json('Permission denied.')
        }
    })
}

module.exports = {verifyToken, verifyAdminRole, verifyUser};
