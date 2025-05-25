import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  Assignment,
  CourseData,
  Module,
  Topic,
  Video,
} from '../../Models/course-details';
import {
  AssignmentResponse,
  CoursesService,
} from '../../Services/courses.service';
import { catchError, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  imports: [CommonModule, NavbarComponent, RouterModule, FormsModule],
})
export class VideoPlayerComponent implements OnInit, AfterViewChecked {
  courseId: string = '';
  moduleId: string = '';
  topicId: string = '';
  videoId?: string;
  assignmentId?: string;

  nextVideoRoute?: { route: string; queryParams: any };
  previousVideoRoute?: { route: string; queryParams: any };

  contentRoutingList: { route: string; queryParams: any }[] = [];
  currentContentIndex: number = 0;

  course?: CourseData;
  module?: Module;
  topic?: Topic;
  video?: Video;
  assignement?: AssignmentResponse;
  userAnswers: any;
  errorMessage: any;
  successMessage?: string;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewChecked(): void {
    this.videoPlayer?.nativeElement.load();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          this.courseId = params['courseId'];
          this.moduleId = params['moduleId'];
          this.topicId = params['topicId'];
          return {
            courseId: this.courseId,
            moduleId: this.moduleId,
            topicId: this.topicId,
          };
        }),
        switchMap((params) => {
          return this.coursesService.getCourseDetails(params.courseId);
        }),
        tap((courseDetails) => {
          this.course = courseDetails;
          this.module = courseDetails.modules.find(
            (module) => module._id === this.moduleId
          );
          this.topic = this.module?.topics.find(
            (topic) => topic._id === this.topicId
          );
          this.contentRoutingList =
            this.module?.topics?.flatMap((topic) => {
              return topic.videos
                .map((video) => {
                  return {
                    route: `/courseExplanation/${this.courseId}/video-player/${this.moduleId}/${topic._id}`,
                    queryParams: { videoId: video._id } as any,
                  };
                })
                .concat(
                  topic.assignments.map((assignment) => {
                    return {
                      route: `/courseExplanation/${this.courseId}/video-player/${this.moduleId}/${topic._id}`,
                      queryParams: {
                        assignmentId: assignment._id,
                      } as any,
                    };
                  })
                );
            }) || [];
        }),
        switchMap(() => this.route.queryParams),
        tap((queryParams) => {
          this.videoId = queryParams['videoId'];
          if (this.videoId) {
            this.video = this.topic?.videos.find(
              (video) => video._id === this.videoId
            );

            this.currentContentIndex = this.contentRoutingList.findIndex(
              (video) => video.queryParams['videoId'] == this.videoId
            );
          } else {
            this.video = undefined;
          }

          this.assignmentId = queryParams['assignmentId'];
          if (this.assignmentId) {
            this.currentContentIndex = this.contentRoutingList.findIndex(
              (assignment) =>
                assignment.queryParams['assignmentId'] == this.assignmentId
            );

            this.coursesService
              .getAssignmentById(this.assignmentId)
              .pipe(
                tap((assignment) => {
                  this.assignement = assignment;
                  // Initialize userAnswers as an object keyed by questionId
                  this.userAnswers = {};
                  assignment.data.questions.forEach((question) => {
                    if (question.type === 'msq') {
                      // For multiple select questions, initialize an array of booleans for each option
                      this.userAnswers[question._id] = question.options.map(
                        () => false
                      );
                    } else if (question.type === 'truefalse') {
                      // For true/false (single select), initialize as empty string
                      this.userAnswers[question._id] = '';
                    }
                  });
                })
              )
              .subscribe();
          } else {
            this.assignement = undefined;
          }

          if (this.currentContentIndex === 0) {
            this.previousVideoRoute = undefined;
          } else if (this.currentContentIndex > 0) {
            this.previousVideoRoute =
              this.contentRoutingList[this.currentContentIndex - 1];
          }
          if (this.currentContentIndex === this.contentRoutingList.length - 1) {
            this.nextVideoRoute = undefined;
          } else if (
            this.currentContentIndex <
            this.contentRoutingList.length - 1
          ) {
            this.nextVideoRoute =
              this.contentRoutingList[this.currentContentIndex + 1];
          }
        })
      )
      .subscribe();
  }

  submitAssignment() {
    console.log(this.userAnswers);
    const answers = {
      assignmentId: this.assignmentId,
      answers: Object.keys(this.userAnswers).map((questionId) => {
        const question = this.assignement?.data.questions.find(
          (question) => question._id === questionId
        );
        const answer = this.userAnswers[questionId];

        if (question?.type === 'msq') {
          return {
            questionId: question._id,
            selectedOptions: answer
              .map((option: any, index: number) => {
                return option ? index : undefined;
              })
              .filter((option: any) => option !== undefined),
          };
        } else {
          return {
            questionId: question?._id,
            selectedOptions: [answer],
          };
        }
      }),
    };
    this.coursesService
      .submitAssignment(answers)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.error.message;
          return [];
        }),
        tap((res: any) => {
          console.log(res);

          if (!res.success) {
            this.errorMessage = res.message;
            this.successMessage = undefined;
          } else {
            if (res.data.passed) {
              this.topic!.assignments.find(
                (assignment) => assignment._id === this.assignmentId
              )!.isCompleted = true;
              this.successMessage = 'Assigment submitted successfully';
              this.errorMessage = undefined;
            } else {
              this.errorMessage = 'You have not passed the assignment';
              this.successMessage = undefined;
            }
          }
        })
      )
      .subscribe();
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  onVideoEnded() {
    if (this.course && this.video) {
      this.coursesService
        .updateVideoCompletionStatus(this.course?._id, this.video?._id)
        .pipe(
          tap(() => {
            this.video!.isCompleted = true;
          })
        )
        .subscribe();
    }
  }
}
