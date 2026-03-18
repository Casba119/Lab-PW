import { useState } from 'react'; 
import Card from './Card';

function App() {
  
  const [count, setCount] = useState(0);

  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
    { title: "Proiect 4", description: "Magazin online" },
    { title: "Proiect 5", description: "Aplicatie de vreme" }
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Interactivitate în React</h1>

  
      <div style={{ margin: '20px', padding: '10px', background: '#eee' }}>
        <p>Butonul a fost apăsat de <strong>{count}</strong> ori</p>
        
    
        <button onClick={() => setCount(count + 1)}>
          Apasă-mă!
        </button>
      </div>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {projects.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}

export default App;