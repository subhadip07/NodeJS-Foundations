import 'dotenv/config';
import express from 'express';
import { connectMongoDB } from './connection.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

connectMongoDB(process.env.MONGODB_URL).then(() => console.log('MongoDB connected'));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));