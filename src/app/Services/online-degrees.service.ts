import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { IOnlineDegrees } from '../Models/ionline-degrees';
import { IExperts } from '../Models/iexperts';
import { IFaqs } from '../Models/ifaqs';
import { ITopics } from '../Models/itopics';

@Injectable({
  providedIn: 'root',
})
export class OnlineDegreesService {
  httpHeaders = {};

  constructor(private httpclient: HttpClient) {
    this.httpHeaders = {
      Headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
  }

  baseURL: string = `${environment.baseURL}/degree`;
  experts: string = `${environment.baseURL}/experts`;
  faqs: string = `${environment.baseURL}/faqs`;
  topics: string = `${environment.baseURL}/topics`;

  getAllDegrees(): Observable<IOnlineDegrees[]> {
    return this.httpclient.get<IOnlineDegrees[]>(`${this.baseURL}/allDegrees`);
  }

  getExperts(): Observable<IExperts[]> {
    // return this.httpclient.get<IExperts[]>(`${this.experts}`);
    return of([
      {
        id: '1',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2IPmuma57uM5ek16lRQAbT/061735e29e1ac3b2b6741fdee4753dec/CUBoulder_360x360.png?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'University of Colorado Boulder',
        degree: 'Master of Engineering in Engineering Management',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2Tj0svl0sk0cwBZdb7a7Gl/d35276c5b6dfe0c8133e0c5d491610da/Jessica_Rush_Leeker_Boulder_ME-EM.jpeg?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Jessica Leeker',
        description: 'Professor in Engineering Practice',
      },
      {
        id: '2',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'University of Michigan',
        degree: 'Master of Public Health',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6jNba3IfoTFyZAlUNrCb1E/51a35a67f6d3acc01d6d91727ce6b260/michigan-mph-Kardia.jpg?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Sharon L.R. Kardia, PhD',
        description:
          'Millicent W. Higgins Collegiate Professor of Epidemiology, Associate Dean for Education',
      },
      {
        id: '3',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1FEh4ZoSeNYJ44HxicpwgE/7e94d0f48196b2f1284c90168dd1104b/CenterILblock-ISQUAREOrangeBackgrnd__1_.png?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'University of Illinois',
        degree: 'Master of Business Administration (iMBA)',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7giNWTdnyZmO4zVuqdbegq/6e1db5fabb1b90b2754f4632550d9976/gary-hecht-news.jpeg?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Gary Hecht',
        description:
          'Associate Dean of Professional Education Pathways and Professor of Accountancy and Arthur Andersen Faculty Fellow',
      },
      {
        id: '4',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2TGd4ZOjIp0SJOb63J2QQj/7a96187ecd3de0afcc7b2759af1341b8/HEC_logo-96.jpg?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'HEC Paris',
        degree: 'MSc in Innovation and Entrepreneurship',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5BBaYlLdj5VmVBKMrJt9MK/04c2e42992b1b8e91811faa41734d64d/laurence-lehmann-ortega.jpg?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Laurence Lehmann-Ortega',
        description: 'Affiliate Professor of Management',
      },
      {
        id: '5',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/2vpThGDM4ephvaJehcYKGs/a8f07a48746d89d7114e7a99b16dba76/uniandessquare.png?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'Universidad de los Andes',
        degree: 'Maestría en Ingeniería de Software',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/31Yd7eG4V1y4aucU5bN7nc/7bcd94a3fcb342c9243d45926ae8b706/Rubby_Casallas_Uniandes.png?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Rubby Casallas, PhD',
        description: 'Profesora titular',
      },
      {
        id: '6',
        img1: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/P0YwewIQ8RlXfWzxp7p66/fcf89fdfc47d60f0363a1c3c8c13ede1/University_of_London_coat_of_arms.png?auto=format%2Ccompress&dpr=1&fm=avif&fit=fill&w=48&h=48',
        university: 'University of London',
        degree: 'Master of Science in Cyber Security',
        img2: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/zCE4mK7JSv0bzfpcxmI3T/ca6e4bdebbeb53ffc8f1ec7d650c00d7/Chris_180315_v2__1_.jpg?auto=format%2Ccompress&dpr=1&fit=fill&w=40&h=40',
        name: 'Chris Mitchell',
        description: 'Professor of Computer Science',
      },
    ]);
  }

  getFaqs(): Observable<IFaqs[]> {
    // return( this.httpclient.get<IFaqs[]>(`${this.faqs}`);
    return of([
      {
        id: '1',
        question:
          'Are the degrees hosted on Coursera from accredited universities? ',
        answer:
          'Yes, all online degree programs available on Coursera are directly conferred by accredited institutions. Accreditation is important because it shows that an institution meets rigorous academic standards, eases your ability to transfer credits, and helps employers validate the quality of education on your resume or application.',
        open: false,
      },
      {
        id: '2',
        question: 'Can I transfer previously earned college credits? ',
        answer:
          'That depends on the degree you’re interested in earning. Many of the bachelor’s degrees on Coursera from US-based institutions, such as Georgetown University’s Bachelor of Arts in Liberal Studies, allow students to transfer some previously earned college credits. Some, like the University of North Texas’ Bachelor of Applied Arts and Sciences and Bachelor of Science in General Business, are degree completion programs and require transfer credits in order to enroll.',
        open: false,
      },
      {
        id: '3',
        question: 'How long do degrees take to finish?',
        answer:
          'Many degree programs with Coursera’s university partners are designed to be pursued part-time or full-time, depending on your availability.Undergraduate degrees take between two and six years, depending on the amount of college credit you’re able to transfer (if applicable) and the length of each degree program. For instance, BITS Pilani recommends dedicating 25 hours per week to your courses, while the University of London recommends 28 hours per week. Graduate degrees can take between one and three years.',
        open: false,
      },
      {
        id: '4',
        question: 'What are the application deadlines? ',
        answer:
          "College application deadlines, for both bachelor’s degrees and master’s degrees, tend to occur just once a year. However, on Coursera, you’ll find greater flexibility from universities. Deadlines tend to occur around three times a year—once in the fall, once in the spring, and once in the summer—depending on the institution. Some degree programs, like the University of Colorado Boulder's Master of Science in Data Science, don't require an application for admission. Instead, you can qualify for performance-based admission by passing three online courses pre-approved by the university with an 80% grade or higher.",
        open: false,
      },
      {
        id: '5',
        question: 'What is the online degree experience like on Coursera?  ',
        answer:
          "Earning your degree from a leading university on Coursera means experiencing greater flexibility than in-person degree programs, so you can earn the best degree for your needs without having to relocate or choose between your other responsibilities. You can take your online courses from anywhere in the world, at a pace that works for you. Once enrolled in your program, you may find a range of learning options, including live video lectures that encourage you to collaborate and self-paced courses that give you greater independence. Moreover, throughout your learning journey, you'll have access to a dedicated support team, course facilitators, and a network of peers to help you achieve your academic goals. Learn more about the benefits of learning online.",
        open: false,
      },
      {
        id: '6',
        question:
          'Does Coursera offer scholarships or tuition assistance? Where can I find information about them? ',
        answer:
          'You cannot apply for a scholarship or tuition assistance directly from Coursera. However, many university partners offer an opportunity to apply for financial support directly. Check with each degree program for more information.',
        open: false,
      },
      {
        id: '7',
        question: 'Is an online degree worth it? ',
        answer:
          'Education is a valuable tool you can use to achieve some goals: pivot to a new field, progress in your career, or learn about a subject in more depth. Online degree programs on Coursera come from accredited university partners and typically offer the same curriculum as their in-person degree programs. Deciding whether an online degree is worth it is ultimately up to you. Consider your overall goals, whether the subject matter in a degree program aligns with your needs, the types of skills you’d like to develop, and how you learn best. These are just some of the factors worth reflecting on as you set about reviewing different degree programs on Coursera. Learn more about whether a bachelor’s degree is worth it and whether a master’s degree is worth it.',
        open: false,
      },
      {
        id: '8',
        question:
          'Can I take online degree courses from anywhere in the world? ',
        answer:
          'Yes, all you need is a reliable internet connection. No matter where you are in the world, you can enroll in the degree programs that Coursera’s university partners offer, though there may be specific application requirements based on your status as a domestic or international student.',
        open: false,
      },
    ]);
  }

  getTopics(): Observable<ITopics[]> {
    // return this.httpclient.get<ITopics[]>(`${this.topics}`);
    return of([
      {
        id: '1',
        title: "A Guide to Online Bachelor's Degrees",
        description:
          'Online bachelor degrees have become increasingly popular, especially for students in need of greater flexibility. Learn more about this degree option, and the many benefits it has to offer.',
        updateDate: 'Last updated on November 29, 2023 Article',
      },
      {
        id: '2',
        title: 'Should You Go Back to School? 7 Things to Consider',
        description:
          'Online bachelor degrees have become increasingly popular, especially for students in need of greater flexibility. Learn more about this degree option, and the many benefits it has to offer.',
        updateDate: 'Last updated on November 29, 2023 Article',
      },
      {
        id: '3',
        title: "A Guide to Online Bachelor's Degrees",
        description:
          'Online bachelor degrees have become increasingly popular, especially for students in need of greater flexibility. Learn more about this degree option, and the many benefits it has to offer.',
        updateDate: 'Last updated on November 29, 2023 Article',
      },
      {
        id: '4',
        title: "A Guide to Online Bachelor's Degrees",
        description:
          'Online bachelor degrees have become increasingly popular, especially for students in need of greater flexibility. Learn more about this degree option, and the many benefits it has to offer.',
        updateDate: 'Last updated on November 29, 2023 Article',
      },
    ]);
  }
}
