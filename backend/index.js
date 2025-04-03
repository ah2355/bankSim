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
  console.log("Received login request:", req.body); 
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try{
       const round = 10;
       const hashedPassword = await bcrypt.hash(password, round);
       
       const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          balance: user.balance
        }
      });
    }
    catch (err) {
        console.error('Error creating user:', err.message);
        res.status(400).json({ error: 'Account creation failed. Username might already exist.' });
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
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      },
    });
  }catch(err){
    console.error('Error logging in:', err.message);
    res.status(500).json({ error: 'Internal server error' });
    
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});