import { Link } from 'react-router';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 — Pagina nu exista</h1>
      <p>sorry, nu exista :-?? </p>
      <Link to="/">Inapoi la Home</Link>
    </div>
  );
}

export default NotFound;