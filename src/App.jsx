import Card from './Card';  

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <Card
        title="Proiect 1" 
        description="Pagina personala cu HTML si CSS" " />
      <Card
      title="Proiect 2" 
      description="Pagina interactiva cu Javascript "/>
      <Card
      title="Proiect 3"
      description="Dashboard cu React" />
    </div>
  );
}

export default App;