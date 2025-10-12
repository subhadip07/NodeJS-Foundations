import jwt from 'jsonwebtoken';


export const authenticationMiddleware = async function (req, res, next)
{
    try
    {
        // Header authorization: Bearer <token>
        const tokenHeader = req.headers['authorization'];

        if (!tokenHeader)
        {
            return next();
        }

        if (!tokenHeader.startsWith('Bearer'))
        {
            return res.status(400).json({ error: 'authorization header must start with Bearer'});
        }

        const token = tokenHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }

    catch(error)
    {
        next();
    }
};

// checking for user is authenticated or not
export const ensureAuthenticated = function (req, res, next)
{
    if (!req.user)
    {
        return res.status(401).json({ error: 'You must be authenticated' });
    }

    next();
};

// authorization based on roles
export const restrictToRole = async function (roles)
{
    return function (req, res, next)
    {
        if (req.user.role !== role)
        {
            return res.status(401).json({ error: 'You are not authorized to access this resource' });
        }

        return next();
    };
};
