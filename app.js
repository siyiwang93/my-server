const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});