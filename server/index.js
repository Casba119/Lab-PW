const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const projects = [
    { id: 1, title: "Pagina Personală", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false },
];

// GET /api/projects/:id 
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
    if (!project) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(project);
});

// GET /api/stats 
app.get('/api/stats', (req, res) => {
    const total = projects.length;
    const done = projects.filter(p => p.done === true).length;
    const inProgress = projects.filter(p => p.done === false).length;

    res.json({
        totalProjects: total,
        completedProjects: done,
        inProgressProjects: inProgress
    });
});

// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul funcționează!' });
});

// GET /api/projects - returnează toate proiectele
app.get('/api/projects', function(req, res) {
    res.json(projects);
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
     const newProject = {
         id: projects.length + 1,
         title: req.body.title,
         tech: req.body.tech,
         done: req.body.done || false,
     };
     projects.push(newProject);
     res.status(201).json(newProject);
});

// DELETE /api/projects/:id 
app.delete('/api/projects/:id', function(req, res) {
     const id = parseInt(req.params.id);
     const index = projects.findIndex(p => p.id === id);

     if (index === -1) {
         return res.status(404).json({ error: 'Not found' });
     }

     projects.splice(index, 1);
     res.json({ message: 'Sters' });
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});