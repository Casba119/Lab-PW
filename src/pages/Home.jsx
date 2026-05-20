import { useState, useEffect } from 'react';

function Home() {
    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(function() {
        fetch('http://localhost:3000/api/stats')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Eroare la incarcarea datelor');
                }
                return response.json();
            })
            .then(function(data) {
                setStats(data);
                setLoading(false);
            })
            .catch(function(err) {
                console.error(err);
                setError('Nu s-au putut incarca statisticile');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Home</h2>
            <p>Bine ai venit pe dashboard-ul meu!</p>

            {loading && <p>Se încarca statisticile live...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', inlineSize: 'fit-content' }}>
                    <h4>Statistici proiecte:</h4>
                    <p>Total proiecte: <strong>{stats.total}</strong></p>
                    <p>Proiecte finalizate: <span style={{ color: 'green' }}><strong>{stats.done}</strong> ✅</span></p>
                    <p>Proiecte in lucru: <span style={{ color: '#b78103' }}><strong>{stats.inProgress}</strong> ⏳</span></p>
                </div>
            )}
        </div>
    );
}

export default Home;