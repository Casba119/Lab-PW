import Card from './Card';

function App() {
  
  const projects = [
    { title: "Proiect 1", description: "Pagina personala cu HTML si CSS" },
    { title: "Proiect 2", description: "Calculator de buget în JS" },
    { title: "Proiect 3", description: "Dashboard React Complex" },
    { title: "Proiect 4", description: "Magazin online " },
    { title: "Proiect 5", description: "Aplicatie de vreme" }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Portofoliul Meu Dinamic</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map(function(item, index) {
          return (
            <Card 
              key={index} 
              title={item.title} 
              description={item.description} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;