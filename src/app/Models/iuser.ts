export interface Iuser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  dob?: Date;
  role?: string;
  code?: string;
  codeExpires?: Date;
  isConfirmed?: boolean;
  isDeleted?: boolean;
  gender?: string;
userImage?: string | File;

  location?: string;
  courses?: string[];
  progress?: {
    progressCourses?: Array<{
      courseId?: string;
      name?: string;
      passedModules?: Array<{
        moduleId?: string;
        name?: string;
        passedTopics?: Array<{
          topicId?: string;
          name?: string;
          passedSubTopics?: Array<{
            subTopicId?: string;
            name?: string;
          }>;}
        >;}
      >;}
    >;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
