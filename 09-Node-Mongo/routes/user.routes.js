import express from 'express';
import {User} from '../models/user.model.js';
import {randomBytes, createHmac} from 'crypto';

const router = express.Router();

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

export default router;