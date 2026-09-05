require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//serve static files from a folder called 'public'
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/api/time', (req, res) => {
  res.json({
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString()
  });
});

//http://localhost:3000/api/greeting?name=sara
app.get('/api/greeting', (req, res) =>{
    const name = req.query.name || 'World';
    res.json({message: `Hello ${name}!`});
});

// Add this to your app.js
app.get('/api/joke', async (req, res) => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.json({ setup: joke.setup, punchline: joke.punchline });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});