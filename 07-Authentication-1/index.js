import { error } from 'console';
import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json());

const DIARY = {

};

const EMAILS = new Set();

// Hey, Here is my car - please park it and give me back a token
// Email => unique car number

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (EMAILS.has(email))
    {
        return res.status(400).json({ error: 'Email already taken' });
    }

    // Create a token for user
    const token = `${Date.now()}`;

    // Do a entry in dairy
    DIARY[token] = { name, email, password };
    EMAILS.add(email);

    return res.json({ statusbar: 'success', token});
});

app.post('/me', (req, res) => {
    const { token } = req.body;
    if (!token)
    {
        return res.status(400).json({ error: 'Missing Token' });
    }

    if (!(token in DIARY))
    {
        return res.status(400).json({ error: 'Invalid Token' });
    }

    const entry = DIARY[token];

    return res.json({ data: entry });
});

app.post('/private-data', (req, res) => {
    const { token } = req.body;
    if (!token)
    {
        return res.status(400).json({ error: 'Missing Token' });
    }

    if (!(token in DIARY))
    {
        return res.status(400).json({ error: 'Invalid Token' });
    }

    const entry = DIARY[token];
    return res.json({ data: { privateData: 'Access Granted' }});
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
