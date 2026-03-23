import { api } from './api';

export interface Animal {
  id: number;
  name: string;
  imageUrl: string;
  height: string;
  weight: string;
}

export interface AnimalCharacteristics {
  habitat: string;
  region: string;
  practice: string;
  location: string;
}

export interface AnimalLocation {
  id: number;
  name: string;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
  locationDescription: string;
}

export const animalService = {
  getAnimals: (offset: number = 0) =>
    api.get<Animal[]>('/animals', { params: { offset: offset.toString() } }),

  getLocations: (offset: number = 0) =>
    api.get<AnimalLocation[]>('/animals/location', { params: { offset: offset.toString() } }),
};
