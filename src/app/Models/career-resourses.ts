import { CareerResoursesCategory } from './career-resourses-category';

export interface CareerResourses {
  _id: string;
  question: string;
  answer: string;
  CareerResourceCategory: CareerResoursesCategory;
  date: string;
}
