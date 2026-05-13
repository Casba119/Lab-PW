const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3000;
const mongoose = require('mongoose');
const Project = require('./models/Project');

mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(function() {
        console.log('Conectat la MongoDB!');
    })
    .catch(function(err) {
        console.error('Eroare conectare MongoDB:', err);
    });

app.use(express.json());

/*const projects = [
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
*/


// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
  res.json({ message: 'Serverul funcționează!' });
});

// GET /api/projects - returnează toate proiectele
app.get('/api/projects', async function(req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare la preluare date' });
    }
});

//GET - returneaza un singur proiect dupa id
app.get('/api/projects/:id', async function(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'nema project' });
        }
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: 'ID invalid' });
    }
});


// POST /api/projects - adauga un proiect nou
app.post('/api/projects', async function(req, res) {
    try {
        const newProject = new Project({
            title: req.body.title,
            tech: req.body.tech,
            done: req.body.done || false,
        });

        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/projects/:id 
app.delete('/api/projects/:id', async function(req, res) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ error: 'Proiectul nu există' });
        }

        res.json({ message: 'Sters' });
    } catch (err) {
        res.status(500).json({ error: 'eroare la stergere ' + err.message });
    }
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});