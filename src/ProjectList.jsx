import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(function() {
        fetch('/data/projects.json')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Eroare : ' + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(function(err) { 
                console.log("EROAREAAA: " , err);
                setError('Eroare la incarcarea datelor'); 
                setLoading(false); 
            })
    }, 
    []);

    //afisare eroare
    if (error) {
        return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;
    }

    if (loading) {
        return <p>Se incarca...</p>;
    }

    return (
        <div>
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
                    <div key={project.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{project.title}</h4>
                        <p>Tehnologii: {project.tech}</p>
                        <p>Status: {project.done ? "finalizat" : "nu inca"}</p>
                    </div>)
                })}
        </div>
    );
}

export default ProjectList;