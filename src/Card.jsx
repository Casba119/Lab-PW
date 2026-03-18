function Card(props) {
  return (
    <div style={{ border: '1px solid #4A90E2', padding: '15px', borderRadius: '10px', margin: '10px', backgroundColor: '#f9f9f9' }}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default Card;