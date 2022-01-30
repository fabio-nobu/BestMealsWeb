import { MealEvaluation } from "./mealEvaluation.model" ;

export interface Meal {
  id: string;
  name: string;
  cost: number;
  ingredients: string;
  evaluations: MealEvaluation[];
}
