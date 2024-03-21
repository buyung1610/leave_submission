import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(403).json({ message: 'Token tidak disediakan' });
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }
        req.userId = decoded.userId;
        next();
    });
}

export default verifyToken;
