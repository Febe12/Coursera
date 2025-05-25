export interface Course {
  image: string;
  title: string;
}

export interface Instructors {
  id: string;
  Name: string;
  instructorImage: string;
  job: string;
  coursesTitle: string[];
  SocialMedia: {
    LinkidIn: string;
  };
  description: string;
  courses: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  CoursesEnglish?: Course[];
}