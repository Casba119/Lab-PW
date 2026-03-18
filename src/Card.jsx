function Card(props) {
  return (
    <div style={{ border: '1px solid #f27af0', padding: '15px', borderRadius: '10px', margin: '10px', backgroundColor: '#000000' }}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default Card;