import express from 'express';
import cors from 'cors';

// App Configs
const app = express();
const port = 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => {
  res.status(200).send('API Working !');
});

// Listen
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
})