import express from 'express';
import axios from 'axios';
import { Pool } from 'pg';
import cors from 'cors';
import morgan from 'morgan'; 

const app = express();
const port = 3030;

const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  password: '123123',
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(morgan('combined')); 


app.get('/fetch-dogs', async (req, res) => {
  try {
    const response = await axios.get('https://random.dog/doggos');
    const filenames = response.data;
      
    const values = filenames.map((filename: string) => `('${filename}', 'https://random.dog/${filename}')`).join(', ');
    const query = `INSERT INTO doggos (name, link) VALUES ${values} ON CONFLICT (name) DO NOTHING`;
      
    await pool.query(query);
      
    res.status(200).send('Doggos fetched and saved to DB');
  } catch (error) {
    res.status(500).send('Error fetching doggos');
  }
});

app.get('/dogs', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1; 
  const limit = 20; 
  const offset = (page - 1) * limit; 

  try {
    const result = await pool.query('SELECT id, name, link, likes FROM doggos ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send('Error fetching dogs');
  }
});

app.post('/dogs/like/:id', async (req, res) => { 
  const { id } = req.params;
  try {
    const checkResult = await pool.query('SELECT id FROM doggos WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).send('Dog not found');
    }

    await pool.query('UPDATE doggos SET likes = likes + 1 WHERE id = $1', [id]);
    res.status(200).send('Liked successfully');
  } catch (error) {
    res.status(500).send('Error liking dog');
  }
});

app.post('/dogs/unlike/:id', async (req, res) => { 
  const { id } = req.params;
  try {
    const checkResult = await pool.query('SELECT id FROM doggos WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).send('Dog not found');
    }

    await pool.query('UPDATE doggos SET likes = likes - 1 WHERE id = $1', [id]);
    res.status(200).send('Unliked successfully');
  } catch (error) {
    res.status(500).send('Error liking dog');
  }
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS doggos (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      link TEXT NOT NULL,
      likes INT DEFAULT 0
    );
  `);
};

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});