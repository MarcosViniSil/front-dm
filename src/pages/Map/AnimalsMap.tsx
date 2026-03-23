import { useState, useEffect, useRef, useCallback } from 'react';
import { animalService } from '../../services';
import type { AnimalLocation } from '../../services';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AnimalsMap.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function AnimalsMap() {
  const [locations, setLocations] = useState<AnimalLocation[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  const listRef = useRef<HTMLDivElement>(null);

  const fetchLocations = useCallback(async (currentOffset: number) => {
    
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    setLoading(true);

    try {
      const data = await animalService.getLocations(currentOffset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLocations((prev) => {
          const newItems = data.filter(d => !prev.some(p => p.id === d.id));
          return [...prev, ...newItems];
        });
        setOffset(currentOffset + 1);
      }
    } catch (err) {
      console.error('Erro ao buscar localizações:', err);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations(0);
  }, [fetchLocations]);

  const handleScroll = () => {
    if (!listRef.current || hasMore === false || loading) return;

    const { scrollTop, clientHeight, scrollHeight } = listRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchLocations(offset);
    }
  };



  const centerLat: number = locations.length > 0 ? -Math.abs(locations[0].location.latitude) : -14.235;
  const centerLng: number = locations.length > 0 ? locations[0].location.longitude : -51.925;

  return (
    <div className="page animals-map-page">
      <div className="map-header">
        <h1>Localização dos Animais</h1>
      </div>

      <div className="map-list-container">
        <h2 className='title-list-animals'>Lista de Animais</h2>
        <div className="map-animal-list" onScroll={handleScroll} ref={listRef}>
          {locations.map((animal) => (
            <div key={`list-${animal.id}`} className="map-animal-card">
              <img src={animal.imageUrl} alt={animal.name} className="map-animal-img" loading="lazy" />
              <div className="map-animal-info">
                <h3>{animal.name}</h3>
                <p>{animal.locationDescription}</p>
              </div>
            </div>
          ))}
          
          {loading && <div className="map-loading">Carregando mais animais...🌿</div>}
        </div>
      </div>

      <div className="map-view-container">
        <MapContainer 
          center={[centerLat, centerLng] as [number, number]} 
          zoom={5} 
          scrollWheelZoom={false} 
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {locations.map((animal) => (
            <Marker 
              key={`marker-${animal.id}`}
              position={[animal.location.latitude, animal.location.longitude] as [number, number]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="map-popup-content">
                  <img src={animal.imageUrl} alt={animal.name} className="popup-animal-img"/>
                  <strong>{animal.name}</strong>
                  <p>{animal.locationDescription}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default AnimalsMap;
