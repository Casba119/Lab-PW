import { useState, useEffect } from 'react';

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
        fetch('http://localhost:3000/api/projects')
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
        const response = await fetch('http://localhost:3000/api/projects', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ title: title, tech: tech }), 
        }); 
        const newProject = await response.json(); 
        setProjects([...projects, newProject]); 
        setTitle('');  // Goleste input-urile 
        setTech(''); 
    } catch (err) { 
        console.error('Eroare:', err); 
    } 
}


async function handleDelete(id) {
    if (!window.confirm("Sigur vrei sa stergi acest proiect?")) return;

    try {
        const response = await fetch('http://localhost:3000/api/projects/' + id, {
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
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone }) // Inversăm statusul curent
            });

            if (!response.ok) {
                throw new Error('Eroare la actualizarea statusului');
            }

            const updatedProject = await response.json();
            // Înlocuim proiectul vechi cu cel nou în state
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
        const response = await fetch('http://localhost:3000/api/projects/' + id, {
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
        return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;
    }

    if (loading) {
        return <p>Se incarca...</p>;
    }

    return (
        <div>
            <div>
            <div style={{ marginBottom: '20px', border: '1px solid #666', padding: '10px' }}>
                <h4>Adaugă proiect nou</h4>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Titlu..." 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Tehnologii..." 
                        value={tech} 
                        onChange={(e) => setTech(e.target.value)} 
                    />
                    <button type="submit">Salvează</button>
                </form>
            </div>

            <hr />
            <h3>Proiecte</h3>
            {/* TODO: Afisati proiectele cu map() si componenta Card din Lab 4 */}
            <input 
                type="text" 
                placeholder="Cauta proiect..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '5px' }}
            />
            {projects
    .filter(function(p) {
        return p.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
            .map(function(project) {
                if (editingId === project._id) {
            return (
                <div key={project._id} style={{ border: '2px solid #0056b3', margin: '10px', padding: '10px', backgroundColor: '#f0f8ff' }}>
                    <h4>Editează Proiectul</h4>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Titlu: </label>
                        <input 
                            type="text" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)} 
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Tehnologii: </label>
                        <input 
                            type="text" 
                            value={editTech} 
                            onChange={(e) => setEditTech(e.target.value)} 
                        />
                    </div>
                    
                    <button 
                        onClick={() => handleSaveEdit(project._id, project.done)}
                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', marginRight: '5px', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Salvează
                    </button>
                    <button 
                        onClick={cancelEdit}
                        style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Anulează
                    </button>
                </div>
            );
        }
                return (
                    <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{project.title}</h4>
                        <p>Tehnologii: {project.tech}</p>
                        <p>Status: {project.done ? "finalizat" : "nu inca"}</p>


                        {/* Butonul de Toggle */}
                                <button 
                                    onClick={() => handleToggle(project._id, project.done)}
                                    style={{ 
                                        backgroundColor: project.done ? '#7cd17c' : '#e0a800', 
                                        color: 'black', 
                                        border: 'none', 
                                        padding: '5px 10px', 
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        marginTop: '5px',
                                        marginRight: '10px' 
                                    }}
                                >
                                    {project.done ? 'Marcheaza ca in lucru' : 'Marcheaza ca finalizat'}
                                </button>

                        {/*  Butonul de Editeaza   */}
                        <button 
                            onClick={() => startEdit(project)}
                            style={{ 
                                backgroundColor: '#17a2b8', 
                                color: 'white', 
                                border: 'none', 
                                padding: '5px 10px', 
                                cursor: 'pointer',
                                borderRadius: '4px',
                                marginTop: '5px',
                                marginRight: '10px'
                            }}
                        >
                            Editeaza
                        </button>        

                        {/* Butonul de stergere */}
                <button 
                    onClick={() => handleDelete(project._id)}
                    style={{ 
                        backgroundColor: '#ff4d4d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '5px 10px', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                        marginTop: '5px'
                    }}
                >
                    Sterge
                </button>
                    </div>)
                })}
        </div>
        </div>
    );
}


export default ProjectList;