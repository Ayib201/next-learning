import { IBaseDTO, IFilterDTO } from './base.dto';
import { EnrollmentStatus, ILessonProgress } from '../entities/enrollment.entity';
import { ICourseCardDTO } from './course.dto';

// Response DTOs
export interface IEnrollmentResponseDTO extends IBaseDTO {
  courseId: string;
  studentId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt?: string;
  progress: number;
  lastAccessedAt?: string;
  certificateId?: string;
}

export interface IEnrollmentDetailDTO extends IEnrollmentResponseDTO {
  course: ICourseCardDTO;
  lessonsProgress: ILessonProgressDTO[];
}

export interface ILessonProgressDTO {
  lessonId: string;
  lessonTitle: string;
  completed: boolean;
  completedAt?: string;
  watchTime?: number;
}

export interface IStudentCourseDTO {
  enrollment: IEnrollmentResponseDTO;
  course: ICourseCardDTO;
  nextLesson?: {
    id: string;
    title: string;
    order: number;
  };
  recentActivity?: string;
}

export interface IStudentProgressDTO {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  averageProgress: number;
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  averageQuizScore: number;
  recentActivity: IActivityDTO[];
}

export interface IActivityDTO {
  type: 'lesson_completed' | 'quiz_completed' | 'assignment_submitted' | 'course_enrolled';
  title: string;
  courseName: string;
  timestamp: string;
  details?: string;
}

// Request DTOs
export interface ICreateEnrollmentDTO {
  courseId: string;
}

export interface IUpdateLessonProgressDTO {
  lessonId: string;
  completed: boolean;
  watchTime?: number;
  lastPosition?: number;
}

// Filter DTOs
export interface IEnrollmentFilterDTO extends IFilterDTO {
  courseId?: string;
  studentId?: string;
  status?: EnrollmentStatus;
}
