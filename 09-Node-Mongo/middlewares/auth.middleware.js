import jwt from 'jsonwebtoken';
// Middleware to authenticate the user using JWT
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const authMiddleware = async(req, res, next) => {
    try 
    {
        const tokenHeader = req.headers["authorization"];

        if (!tokenHeader.startsWith('Bearer'))
        {
            return res
                .status(400)
                .json({ error: 'Authorization token must be Bearer [token]'});
        }

        const token = tokenHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        return next();
    } 
    catch (error) 
    {
        next();
    }
};