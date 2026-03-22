import ExampleComponent from '../../components/ExampleComponent/ExampleComponent';
import './Home.css';

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <h1>Animais da mata atlântica</h1>
      </section>

      <section className="features">
        <ExampleComponent
          title="Components"
          description="Blocos de construção de UI reutilizáveis"
        />
        <ExampleComponent
          title="Services"
          description="Camada de API e lógica de negócios"
        />
        <ExampleComponent
          title="Routing"
          description="Navegação baseada em página com React Router"
        />
      </section>
    </div>
  );
};

export default Home;
