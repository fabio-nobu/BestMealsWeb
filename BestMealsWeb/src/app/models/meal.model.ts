import { Restaurant } from './restaurant.model';

export interface Meal {
  id: string;
  name: string;
  cost: number;
  ingredients: string;
}
