require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Project = require('./models/Project');

mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log('Conectat cu succes la MongoDB Atlas!');
    })
    .catch(function(err) {
        console.error('Eroare conectare MongoDB Atlas:', err);
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
  res.json({ message: 'Serverul funcționeaza' });
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

//de la lab 11
app.put('/api/projects/:id', async function(req, res) {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }   // returneaza documentul DUPA actualizare 
        );
        
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
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
            return res.status(404).json({ error: 'Proiectul nu exista' });
        }

        res.json({ message: 'Sters' });
    } catch (err) {
        res.status(500).json({ error: 'eroare la stergere ' + err.message });
    }
});


// GET /api/stats - returneaza statistici live din baza de date
app.get('/api/stats', async function(req, res) {
    try {
        const total = await Project.countDocuments();
        const done = await Project.countDocuments({ done: true });
        
        res.json({ 
            total: total, 
            done: done, 
            inProgress: total - done 
        });
    } catch (err) {
        res.status(500).json({ error: 'Eroare server: ' + err.message });
    }
});


// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});