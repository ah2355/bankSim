import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcrypt';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BankSim backend running');
});

app.get('/api/test-db', async (req, res) => {
    try {
      const result = await db.query('SELECT NOW()');
      res.json({ connected: true, time: result.rows[0].now });
    } catch (err) {
      console.error('Database connection failed:', err);
      res.status(500).json({ connected: false, error: err.message });
    }
  });

app.get('/users', async (req, res) => {
  const result = await db.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const check = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (check.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists. Please choose another.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, balance',
      [username, hashedPassword, 'customer']
    );

    const user = result.rows[0];
    console.log("Account created:", user);

    res.status(201).json({
      message: 'Account created successfully!',
      user
    });
  } catch (err) {
    console.error("Error creating user:", err.stack || err);
    res.status(500).json({ error: err.message || 'Internal server error.' });
  }
});


app.post('/api/login', async (req,res)=>{
  const { username, password } = req.body;

  try{
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
   
    if(result.rows.length === 0){
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    console.log("Login successful for:", user.username);
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    });
  }catch(err){
    console.error('Error logging in:', err.message);
    res.status(500).json({ error: 'Internal server error' });
    
  }
});

app.post('/api/deposit' , async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: 'User ID and amount are required' });
  }

  try {
    const result = await db.query('UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING *', [amount, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = result.rows[0];
    console.log("Deposit successful for:", updatedUser.username);

    res.json({
      message: 'Deposit successful',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        balance: updatedUser.balance,
      },
    });
  } catch (err) {
    console.error('Error processing deposit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/withdraw', async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: 'User ID and amount are required' });
  }

  try {
    const result = await db.query('UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING *', [amount, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = result.rows[0];
    console.log("Withdrawal successful for:", updatedUser.username);

    res.json({
      message: 'Withdrawal successful',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        balance: updatedUser.balance,
      },
    });
  } catch (err) {
    console.error('Error processing withdrawal:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});