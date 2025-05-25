export interface LandingPage {
  id:string
  title:string;
  image:string;
  description:string;
  logoImage:string[];
  ExploreCoursera: {
    image: string;
    description: string;
    number: string;
  }[];
  CourseraCommunity:{
    image: string;
    description: string;
    name:string;
    community:string;
  }[];
}