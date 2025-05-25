import { Component, OnInit } from '@angular/core';
import { OnlineDegreesService } from '../../Services/online-degrees.service';
import { IOnlineDegrees } from '../../Models/ionline-degrees';
import { CommonModule } from '@angular/common';
import { IExperts } from '../../Models/iexperts';
import { IFaqs } from '../../Models/ifaqs';
import { ITopics } from '../../Models/itopics';

@Component({
  selector: 'app-online-degrees',
  imports: [CommonModule],
  templateUrl: './online-degrees.component.html',
  styleUrl: './online-degrees.component.scss',
})
export class OnlineDegreesComponent implements OnInit {
  degrees: IOnlineDegrees[] = [];
  filterdDegrees: IOnlineDegrees[] = [];

  subjects: string[] = [
    'Arts and Humanities',
    'Business',
    'Computer Science',
    'Data Science',
    'Information Technology',
    'Health',
    'Math and Logic',
    'Personal Development',
    'Physical Science and Engineering',
    'Social Science',
    'Language Learning',
  ];
  levels: string[] = ["Bachelor's Degree", "Master's Degree"];

  selectedSubjects: string[] = [];
  selectedLevels: string[] = [];

  collection1: IOnlineDegrees[] = [];
  collection2: IOnlineDegrees[] = [];
  collection3: IOnlineDegrees[] = [];
  collection4: IOnlineDegrees[] = [];
  collection5: IOnlineDegrees[] = [];
  experts: IExperts[] = [];
  topics: ITopics[] = [];
  faqs: IFaqs[] = [];

  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;
  pages: number[] = [];

  Degs = [
    {
      id: 1,
      title: "Bachelor's Degrees",
    },
    {
      id: 2,
      title: "Master's Degrees",
    },
    {
      id: 3,
      title: 'Postgraduate Programs',
    },
  ];

  Category = [
    {
      id: 1,
      title: 'Business and MBA Degrees',
    },
    {
      id: 2,
      title: 'Computer Science Degrees',
    },
    {
      id: 3,
      title: 'Data Science Degrees',
    },
    {
      id: 4,
      title: 'Public Health Degrees',
    },
    {
      id: 5,
      title: 'Data Analytics Degrees',
    },
    {
      id: 6,
      title: 'Top European Degrees',
    },
    {
      id: 7,
      title: 'Maestrías en línea de Latinoamérica',
    },
    {
      id: 8,
      title: 'Top Indian Degrees',
    },
  ];

  constructor(private onlineDegreesService: OnlineDegreesService) {}
  ngOnInit(): void {
    this.loadDegrees();

    this.onlineDegreesService.getExperts().subscribe({
      next: (data) => {
        this.experts = data;
      },
      error: (err) => console.log(err),
    });

    this.onlineDegreesService.getTopics().subscribe({
      next: (data) => {
        this.topics = data;
      },
      error: (err) => console.log(err),
    });

    this.onlineDegreesService.getFaqs().subscribe({
      next: (data) => {
        this.faqs = data;
        this.displayedFaqs = this.faqs.slice(0, 3);
      },
      error: (err) => console.log(err),
    });

    // this.getAllCollections();
  }

  loadDegrees() {
    this.onlineDegreesService.getAllDegrees().subscribe({
      next: (data) => {
        this.degrees = data;

        this.collection1 = this.getRandomDegrees(3);
        this.collection2 = this.getRandomDegrees(3);
        this.collection3 = this.getRandomDegrees(3);
        this.collection4 = this.getRandomDegrees(3);
        this.collection5 = this.getRandomDegrees(3);

        this.applyFilters();
      },
      error: (err) => console.log(err),
    });
  }

  private getRandomDegrees(count: number) {
    return this.degrees
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  toggleLevel(level: string) {
    const index = this.selectedLevels.indexOf(level);
    if (index === -1) {
      this.selectedLevels.push(level);
    } else {
      this.selectedLevels.splice(index, 1);
    }
    this.applyFilters();
  }

  toggleSubject(subject: string) {
    const index = this.selectedSubjects.indexOf(subject);
    if (index === -1) {
      this.selectedSubjects.push(subject);
    } else {
      this.selectedSubjects.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.filterdDegrees = this.degrees.filter((degree) => {
      const matchesLevel =
        this.selectedLevels.length === 0 ||
        this.selectedLevels.includes(degree.level);
      const matchesSubject =
        this.selectedSubjects.length === 0 ||
        this.selectedSubjects.includes(degree.subject);
      return matchesLevel && matchesSubject;
    });

    this.totalPages = Math.ceil(this.filterdDegrees.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.currentPage = 1;
    this.updateDegrees();
  }

  clearFilters() {
    this.selectedLevels = [];
    this.selectedSubjects = [];
    this.filterdDegrees = [...this.degrees];

    this.totalPages = Math.ceil(this.filterdDegrees.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.currentPage = 1;
    this.updateDegrees();
  }

  displayedDegrees: any[] = [];

  updateDegrees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedDegrees = this.filterdDegrees.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDegrees();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDegrees();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDegrees();
    }
  }

  showAll = false;
  displayedFaqs = this.faqs.slice(0, 3);

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.displayedFaqs = this.showAll ? this.faqs : this.faqs.slice(0, 3);
  }

  toggleAnswer(id: number) {
    const faq = this.faqs.find((f) => +f.id === id);
    if (faq) faq.open = !faq.open;
  }
}
