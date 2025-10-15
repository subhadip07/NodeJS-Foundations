import express from 'express';
import {User} from '../models/user.model.js';
import {randomBytes, createHmac} from 'crypto';
import jwt from 'jsonwebtoken';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.patch('/', ensureAuthenticated, async(req, res) => {
    const { name } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
        name,
    });

    return res.json({ status: 'success' });
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existinguser = await User.findOne({
        email,
    });

    if (existinguser)
    {
        return res
            .status(400)
            .json({ error: `User with email ${email} already exists`});
    }

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    const user = await User.insertOne({
        name,
        email,
        password: hashedPassword,
        salt,
    });

    return res.status(201).json({ status: 'success', data: { id: user._id }});

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existinguser = await User.findOne({
        email,
    });

    if (!existinguser)
    {
        return res
            .status(404)
            .json({ error: `User with email ${email} does not exist`}); 
    }

    const salt = existinguser.salt;
    const hashed = existinguser.password;

    const newHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashed !== newHash)
    {
        return res.status(400).json({ error: 'Invalid Password' });
    }

    const payload = {
        name: existinguser.name,
        _id: existinguser._id,
        email: existinguser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ status: 'success', token});
});

export default router;