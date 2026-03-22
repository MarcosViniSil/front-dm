import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound(){
  return (
    <div className="page not-found-page">
      <h1>404</h1>
      <p>A paǵina que você buscou não existe.</p>
      <Link to="/" className="back-link">
        ← Voltar para página inicial
      </Link>
    </div>
  );
};

export default NotFound;
