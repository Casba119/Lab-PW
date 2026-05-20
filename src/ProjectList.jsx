import { useState, useEffect } from 'react';
import './ProjectList.css';

const API = 'https://lab-pw-v4yx.onrender.com';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    const [editingId, setEditingId] = useState(null);  
    const [editTitle, setEditTitle] = useState('');     
    const [editTech, setEditTech] = useState('');

    useEffect(function() {
        fetch(`${API}/api/projects`)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Eroare : ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                setProjects(data);
                setLoading(false);
            })
            .catch(function(err) { 
                console.log("EROAREAAA: " , err);
                setError('Eroare la incarcarea datelor'); 
                setLoading(false); 
            })
    }, 
    []);

    async function handleSubmit(e) { 
    e.preventDefault(); 
    try { 
        const response = await fetch(`${API}/api/projects`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ title: title, tech: tech }), 
        }); 
        const newProject = await response.json(); 
        setProjects([...projects, newProject]); 
        setTitle('');   
        setTech(''); 
    } catch (err) { 
        console.error('Eroare:', err); 
    } 
}


async function handleDelete(id) {
    if (!window.confirm("Sigur vrei sa stergi acest proiect?")) return;

    try {
        const response = await fetch(`${API}/api/projects/${id}` , {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Eroare la stergere');
        }
        setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
        console.error('Eroare:', err);
        alert("Nu s-a putut sterge proiectul");
    }
}

    //lab11 ex1 async toggle
    async function handleToggle(id, currentDone) {
        try {
            const response = await fetch(`${API}/api/projects/${id}` , {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone })  
            });

            if (!response.ok) {
                throw new Error('Eroare la actualizarea statusului');
            }

            const updatedProject = await response.json();
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
        } catch (err) {
            console.error('Eroare la toggle:', err);
        }
    }

 // Editeaza
function startEdit(project) {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
}

//  Anuleaza
function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditTech('');
}

// Salveaza
async function handleSaveEdit(id, currentDone) {
    try {
        const response = await fetch(`${API}/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editTitle, tech: editTech, done: currentDone })
        });

        if (!response.ok) {
            throw new Error('Eroare la salvarea modificarilor');
        }

        const updatedProject = await response.json();
    
        setProjects(projects.map(p => p._id === id ? updatedProject : p));
        cancelEdit();
    } catch (err) {
        console.error('Eroare la editare:', err);
        alert('Nu s-au putut salva modificările.');
    }
}

    //afisare eroare
    if (error) {
        return <p style={{ color: '#ff4d4d', fontWeight: 'bold', padding: '20px' }}>{error}</p>;
    }

    if (loading) {
        return <p style={{ padding: '20px', color: '#ccc' }}>Se incarca...</p>;
    }

    return (
        < div className="projects-container">
            <div className="add-project-box">
                <h4>Adauga proiect nou</h4>
                <form onSubmit={handleSubmit} className="project-form">
                    <input 
                        type="text" 
                        placeholder="Titlu..." 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="project-input"
                    />
                    <input 
                        type="text" 
                        placeholder="Tehnologii..." 
                        value={tech} 
                        onChange={(e) => setTech(e.target.value)} 
                        className="project-input"
                    />
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0' }}>Salveaza</button>
                </form>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #333', marginBottom: '25px' }} />
            <h3 style={{ color: '#fff' }}>Proiecte</h3>
            
            <input 
                type="text" 
                placeholder="Cauta proiect..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="project-input search-input"
            />
            {projects
                .filter(function(p) {
                    return p.title.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map(function(project) {
                    if (editingId === project._id) {
                        return (
                            <div key={project._id} className="edit-project-box">
                                <h4>Editeaza Proiectul</h4>
                                <div className="edit-field">
                                    <label>Titlu: </label>
                                    <input 
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)} 
                                        className="project-input"
                                    />
                                </div>
                                <div className="edit-field">
                                    <label>Tehnologii: </label>
                                    <input 
                                        type="text" 
                                        value={editTech} 
                                        onChange={(e) => setEditTech(e.target.value)} 
                                        className="project-input"
                                    />
                                </div>
                                
                                <button 
                                    onClick={() => handleSaveEdit(project._id, project.done)}
                                    className="btn btn-success"
                                >
                                    Salveaza
                                </button>
                                <button 
                                    onClick={cancelEdit}
                                    className="btn btn-secondary"
                                >
                                    Anuleaza
                                </button>
                            </div>
                        );
                    }
                    return (
                        <div 
                            key={project._id} 
                            className={`project-card ${project.done ? 'completed' : 'in-progress'}`}
                        >
                            <h4>{project.title}</h4>
                            <p>Tehnologii: {project.tech}</p>
                            <p className={`status-text ${project.done ? 'completed' : 'in-progress'}`}>
                                Status: {project.done ? "finalizat" : "nu inca"}
                            </p>

                            {/* Butonul de Toggle */}
                            <button 
                                onClick={() => handleToggle(project._id, project.done)}
                                className={`btn ${project.done ? 'btn-warning' : 'btn-success'}`}
                            >
                                {project.done ? 'Marcheaza ca in lucru' : 'Marcheaza ca finalizat'}
                            </button>

                            {/* Butonul de Editeaza   */}
                            <button 
                                onClick={() => startEdit(project)}
                                className="btn btn-info"
                            >
                                Editeaza
                            </button>        

                            {/* Butonul de stergere */}
                            <button 
                                onClick={() => handleDelete(project._id)}
                                className="btn btn-danger"
                            >
                                Sterge
                            </button>
                        </div>
                    );
                })}
        </div>
        
    );
}

export default ProjectList;