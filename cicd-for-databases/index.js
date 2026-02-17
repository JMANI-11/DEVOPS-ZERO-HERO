require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.render('index', { todos: result.rows });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send('Error fetching todos');
  } finally {
    client.release();
  }
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO todos (title) VALUES ($1)', [title]);
    res.redirect('/');
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).send('Error adding todo');
  } finally {
    client.release();
  }
});

app.post('/todos/:id/toggle', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1',
      [id]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error toggling todo:', err);
    res.status(500).send('Error toggling todo');
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});