import { api } from './api';

export interface Animal {
  id: number;
  name: string;
  imageUrl: string;
  height: string;
  weight: string;
}

export const animalService = {
  getAnimals: (offset: number) =>
    api.get<Animal[]>('/animals', {
      params: { offset: String(offset) },
    }),
};
