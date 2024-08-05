import express from 'express';
import cors from 'cors';
import api from './routes/api.js';

const app = express();

app.use(cors());
app.use(express.json()); // remove if not useful

app.use('/api/v1', api);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));