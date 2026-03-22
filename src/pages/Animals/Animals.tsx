import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { animalService } from '../../services';
import type { Animal } from '../../services';
import './Animals.css';

function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchAnimals = useCallback(async (currentOffset: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await animalService.getAnimals(currentOffset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAnimals((prev) => [...prev, ...data]);
        setOffset(currentOffset + data.length);
      }
    } catch (err) {
      console.error('Erro ao buscar animais:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchAnimals(0);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!document.scrollingElement || hasMore === false || loading) return;

      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.scrollingElement.scrollHeight;

      if (windowHeight + scrollTop >= scrollHeight - 100) {
        fetchAnimals(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, loading, hasMore, fetchAnimals]);


  return (
    <div className="page animals-page">
      <section className="animals-hero">
        <h1>
          Animais<br />
          <span className="highlight">Mata Atlântica</span>
        </h1>
      </section>

      <section className="animals-grid">
        {animals.map((animal) => (
          <article key={animal.id} className="animal-card">
            <div className="animal-card__image-wrapper">
              <img
                src={animal.imageUrl}
                alt={animal.name}
                className="animal-card__image"
                loading="lazy"
              />
            </div>

            <div className="animal-card__body">
              <h2 className="animal-card__name">{animal.name}</h2>

              <ul className="animal-card__stats">
                <li>
                  <span className="stat-label">Altura</span>
                  <span className="stat-value">{animal.height}</span>
                </li>
                <li>
                  <span className="stat-label">Peso</span>
                  <span className="stat-value">{animal.weight}</span>
                </li>
              </ul>

              <Link
                to={`/animal/${animal.id}`}
                className="animal-card__cta"
                id={`quiz-link-${animal.id}`}
              >
                Realizar Quiz
              </Link>
            </div>
          </article>
        ))}
      </section>

      {hasMore && (
        <div ref={sentinelRef} className="animals-sentinel">
          {loading && (
            <div className="animals-spinner" aria-label="Carregando mais animais">
              <span className="spinner-dot" />
              <span className="spinner-dot" />
              <span className="spinner-dot" />
            </div>
          )}
        </div>
      )}

      {!hasMore && animals.length > 0 && (
        <p className="animals-end">🌿 Todos os animais foram carregados</p>
      )}
    </div>
  );
}

export default Animals;
