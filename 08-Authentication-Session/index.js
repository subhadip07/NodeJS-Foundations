import express from 'express';
import db from './db/index.js';
import userRouter from './routes/user.routes.js';
import {usersTable, userSessions} from './db/schema.js';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(async function(req, res, next){
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

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1m'});

        req.user = decoded;
        next();
    }

    catch(err)
    {
        next();
    }
    
   
    
});

app.get('/', (req, res) => {
    return res.json({ status: 'Server is up and running'})
});

app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
