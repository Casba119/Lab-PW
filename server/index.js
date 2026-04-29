const express = require('express');
const app = express();
const PORT = 3000;

const projects = [
    { id: 1, title: "Pagina Personală", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul funcționează!' });
});

// GET /api/projects - returnează toate proiectele
app.get('/api/projects', function(req, res) {
    res.json(projects);
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});