export interface Stats {
  energy: number;
  mood: number;
  skill: number;
  health: number;
}

export interface TamaState {
  stats: Stats;
  level: number;
  accessories: string[];
  messages: string[];
  currentForm: 'baby' | 'teen' | 'adult';
}

export interface Challenge {
  id: string;
  type: 'debug';
  question: string;
  code?: string;
  answer: string;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
}

export interface SavedState {
  stats: Stats;
  level: number;
  accessories: string[];
  currentForm: 'baby' | 'teen' | 'adult';
  lastSaved: number;
}