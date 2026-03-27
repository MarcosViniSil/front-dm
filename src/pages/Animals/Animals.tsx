import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Spin, Button } from 'antd';
import { animalService } from '../../services';
import type { Animal } from '../../services';
import ShareButton from '../../components/share/Share';

const { Title, Text } = Typography;

function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  const fetchAnimals = useCallback(async (currentOffset: number) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
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
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, loading, hasMore, fetchAnimals]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem 2rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
        <Title level={1} style={{ fontSize: '2.6rem', lineHeight: 1.1, marginBottom: 0 }}>
          Animais<br />
          <span style={{ color: '#4A5D23' }}>Mata Atlântica</span>
        </Title>
      </div>

      {/* Grid of animal cards */}
      <Row gutter={[24, 24]}>
        {animals.map((animal) => (
          <Col key={animal.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              cover={
                <div style={{ overflow: 'hidden', aspectRatio: '4 / 3', background: '#EDE8D6' }}>
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              }
              styles={{
                body: { padding: '1.25rem 1.5rem 1.5rem' },
              }}
            >
              <Title level={4} style={{ marginBottom: 12 }}>{animal.name}</Title>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: 16 }}>
                <div>
                  <Text
                    type="secondary"
                    style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block' }}
                  >
                    Altura
                  </Text>
                  <Text strong style={{ fontSize: '0.88rem' }}>{animal.height}</Text>
                </div>
                <div>
                  <Text
                    type="secondary"
                    style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block' }}
                  >
                    Peso
                  </Text>
                  <Text strong style={{ fontSize: '0.88rem' }}>{animal.weight}</Text>
                </div>
              </div>

              <Link to={`/quiz/${animal.id}`} id={`quiz-link-${animal.id}`}>
                <Button
                  type="primary"
                  block
                  style={{
                    height: 44,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #4A5D23 0%, #6B7F3A 100%)',
                  }}
                >
                  Realizar Quiz
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Loading spinner */}
      {hasMore && loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0 3rem' }}>
          <Spin size="large" />
        </div>
      )}

      {/* End message */}
      {!hasMore && animals.length > 0 && (
        <Text
          type="secondary"
          style={{ display: 'block', textAlign: 'center', padding: '1.5rem 0 3rem', fontWeight: 600 }}
        >
          🌿 Todos os animais foram carregados
        </Text>
      )}

      <ShareButton 
        title="Amigos da Fauna - Gato-Mourisco" 
        text="Conheça tudo sobre o Gato-Mourisco e como nossa fauna é incrível!" 
        url="http://seusite.com/animais/1"
      />    
    </div>
  );
}

export default Animals;
