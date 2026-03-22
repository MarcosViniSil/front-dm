import { api } from './api';

export interface QuizOption {
  id: number;
  value: string;
}

export interface QuizQuestion {
  statement: string;
  // Note: the API returns options as a stringified JSON array based on user description
  options: string;
  code: number;
}

export interface QuizAnswerPayload {
  questionCode: number;
  userAnswer: number;
}

export const quizService = {
  getQuizByAnimalId: (animalId: number): Promise<QuizQuestion[]> =>
    api.get<QuizQuestion[]>('/quiz/list', { 
      params: { animalId: animalId.toString() },
      credentials: 'include' 
    }),

  submitAnswer: (payload: QuizAnswerPayload): Promise<any> =>
    api.post<any>('/quiz/answer', payload,{
       credentials: 'include' 
    }),
};
