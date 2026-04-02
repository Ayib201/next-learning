import { IBaseDTO, IFilterDTO } from './base.dto';
import { CourseCategory, CourseLevel, CourseStatus } from '../entities/course.entity';
import { IUserProfileDTO } from './user.dto';

// Response DTOs
export interface ICourseResponseDTO extends IBaseDTO {
  title: string;
  description: string;
  shortDescription: string;
  teacherId: string;
  teacher?: IUserProfileDTO;
  category: CourseCategory;
  level: CourseLevel;
  status: CourseStatus;
  thumbnail?: string;
  duration: number;
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  tags: string[];
}

export interface ICourseDetailDTO extends ICourseResponseDTO {
  lessons: ILessonSummaryDTO[];
  quizCount: number;
  assignmentCount: number;
}

export interface ILessonSummaryDTO {
  id: string;
  title: string;
  order: number;
  duration: number;
  type: string;
  isFree: boolean;
}

export interface ICourseCardDTO {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail?: string;
  teacherName: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: number;
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  progress?: number;
}

// Request DTOs
export interface ICreateCourseDTO {
  title: string;
  description: string;
  shortDescription: string;
  category: CourseCategory;
  level: CourseLevel;
  thumbnail?: string;
  tags?: string[];
}

export interface IUpdateCourseDTO {
  title?: string;
  description?: string;
  shortDescription?: string;
  category?: CourseCategory;
  level?: CourseLevel;
  status?: CourseStatus;
  thumbnail?: string;
  tags?: string[];
}

// Filter DTOs
export interface ICourseFilterDTO extends IFilterDTO {
  category?: CourseCategory;
  level?: CourseLevel;
  status?: CourseStatus;
  teacherId?: string;
  minRating?: number;
  tags?: string[];
}
