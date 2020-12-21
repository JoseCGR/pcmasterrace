const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).send('Acceso denegado');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Token invalida');
    }

    next();
}

exports.obtenerId = (req) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded._id;
    return userId;
}
