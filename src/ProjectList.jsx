import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

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
                return (
                    <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{project.title}</h4>
                        <p>Tehnologii: {project.tech}</p>
                        <p>Status: {project.done ? "finalizat" : "nu inca"}</p>
                    </div>)
                })}
        </div>
        </div>
    );
}


export default ProjectList;