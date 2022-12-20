const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader == undefined) {
            return res.status(401).json({ message: "please provide authorization header" })
        }
        const token = authorizationHeader.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
};
