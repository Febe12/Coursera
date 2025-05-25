export interface ICareerCourses {
 id: string;
  name: string;
  description: string;
  jobTitle: string;
categoryID: string;
  courseImage: string;
  IfYouLike: string;
  IfYouLikeValue: string;
  SkillsNeeded: string;
  SkillsNeededValue: string;
  logoImage: string;
  organization: string;
  views: number;
    Skills: string[];
  reviews: any[];
  enrolled: number;
  outcomesImage: string;
careerImage:string;

  instructor:string;
   WhatYouWillLearn: string[];
  outComes: {
    outComesTitle: string;
    outComesDescription: string[];
  };
 relatedCourses: {
    relatedCourseID: string;
    name: string;
    relatedImage: string;
    _id: string;
  }[];
 modules: string[];
    createdAt?: Date;
  updatedAt?: Date;
}