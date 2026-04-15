import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function() {
        fetch('/data/projects.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Se incarca...</p>;
    }

    return (
        <div>
            <h3>Proiecte</h3>
            {/* TODO: Afisati proiectele cu map() si componenta Card din Lab 4 */}
            {projects.map(function(project) {
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