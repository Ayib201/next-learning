import { EnrollmentEntity } from '../entities/enrollment.entity';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { CourseRepository } from '../repositories/course.repository';
import { LessonRepository } from '../repositories/lesson.repository';
import { UserRepository } from '../repositories/user.repository';
import { EnrollmentMapper } from '../mappers/enrollment.mapper';
import { CourseMapper } from '../mappers/course.mapper';
import {
  IEnrollmentResponseDTO,
  IEnrollmentDetailDTO,
  IStudentCourseDTO,
  IStudentProgressDTO,
  ICreateEnrollmentDTO,
  IUpdateLessonProgressDTO,
} from '../dtos/enrollment.dto';
import { IApiResponseDTO } from '../dtos/base.dto';

export interface IEnrollmentService {
  enrollStudent(studentId: string, courseId: string): Promise<IApiResponseDTO<IEnrollmentResponseDTO>>;
  unenrollStudent(studentId: string, courseId: string): Promise<IApiResponseDTO<boolean>>;
  getEnrollmentDetail(enrollmentId: string): Promise<IApiResponseDTO<IEnrollmentDetailDTO>>;
  getStudentCourses(studentId: string): Promise<IApiResponseDTO<IStudentCourseDTO[]>>;
  getStudentProgress(studentId: string): Promise<IApiResponseDTO<IStudentProgressDTO>>;
  updateLessonProgress(enrollmentId: string, dto: IUpdateLessonProgressDTO): Promise<IApiResponseDTO<IEnrollmentResponseDTO>>;
  isEnrolled(studentId: string, courseId: string): Promise<boolean>;
  completeCourse(enrollmentId: string): Promise<IApiResponseDTO<IEnrollmentResponseDTO>>;
}

export class EnrollmentService implements IEnrollmentService {

  constructor(
    private enrollmentRepository: EnrollmentRepository,
    private courseRepository: CourseRepository,
    private lessonRepository: LessonRepository,
    private userRepository: UserRepository,
    private enrollmentMapper: EnrollmentMapper,
    private courseMapper: CourseMapper
  ) {}

  async enrollStudent(studentId: string, courseId: string): Promise<IApiResponseDTO<IEnrollmentResponseDTO>> {
    try {
      // Check if already enrolled
      const existing = await this.enrollmentRepository.findByCourseAndStudent(courseId, studentId);
      if (existing && existing.status !== 'dropped') {
        return { success: false, error: 'Already enrolled in this course' };
      }

      // Check if course exists and is published
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }
      if (!course.isPublished()) {
        return { success: false, error: 'Course is not available for enrollment' };
      }

      // Create enrollment
      const enrollment = this.enrollmentMapper.toEntity({ courseId }, studentId);
      
      // Initialize lesson progress
      const lessons = await this.lessonRepository.findByCourseOrdered(courseId);
      enrollment.lessonsProgress = lessons.map(lesson => ({
        lessonId: lesson.id,
        completed: false,
      }));

      await this.enrollmentRepository.create(enrollment);
      await this.courseRepository.incrementEnrollment(courseId);

      return {
        success: true,
        data: this.enrollmentMapper.toResponseDTO(enrollment),
        message: 'Successfully enrolled in course',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unenrollStudent(studentId: string, courseId: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const enrollment = await this.enrollmentRepository.findByCourseAndStudent(courseId, studentId);
      if (!enrollment) {
        return { success: false, error: 'Enrollment not found' };
      }

      enrollment.drop();
      await this.enrollmentRepository.update(enrollment);
      await this.courseRepository.decrementEnrollment(courseId);

      return { success: true, data: true, message: 'Successfully unenrolled from course' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getEnrollmentDetail(enrollmentId: string): Promise<IApiResponseDTO<IEnrollmentDetailDTO>> {
    try {
      const enrollment = await this.enrollmentRepository.findById(enrollmentId);
      if (!enrollment) {
        return { success: false, error: 'Enrollment not found' };
      }

      const course = await this.courseRepository.findById(enrollment.courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const teacher = await this.userRepository.findById(course.teacherId);
      const lessons = await this.lessonRepository.findByCourseOrdered(course.id);

      const courseCard = this.courseMapper.toCardDTO(course, teacher?.fullName ?? 'Unknown', enrollment.progress);
      const detail = this.enrollmentMapper.toDetailDTO(enrollment, courseCard, lessons);

      return { success: true, data: detail };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getStudentCourses(studentId: string): Promise<IApiResponseDTO<IStudentCourseDTO[]>> {
    try {
      const enrollments = await this.enrollmentRepository.findActiveByStudent(studentId);
      
      const studentCourses: IStudentCourseDTO[] = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await this.courseRepository.findById(enrollment.courseId);
          if (!course) {
            throw new Error(`Course ${enrollment.courseId} not found`);
          }

          const teacher = await this.userRepository.findById(course.teacherId);
          const lessons = await this.lessonRepository.findByCourseOrdered(course.id);
          
          // Find next incomplete lesson
          const completedLessonIds = enrollment.lessonsProgress
            .filter(lp => lp.completed)
            .map(lp => lp.lessonId);
          const nextLesson = lessons.find(l => !completedLessonIds.includes(l.id));

          const courseCard = this.courseMapper.toCardDTO(
            course, 
            teacher?.fullName ?? 'Unknown', 
            enrollment.progress
          );

          return this.enrollmentMapper.toStudentCourseDTO(
            enrollment,
            courseCard,
            nextLesson ? { id: nextLesson.id, title: nextLesson.title, order: nextLesson.order } : undefined
          );
        })
      );

      return { success: true, data: studentCourses };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getStudentProgress(studentId: string): Promise<IApiResponseDTO<IStudentProgressDTO>> {
    try {
      const allEnrollments = await this.enrollmentRepository.findByStudent(studentId);
      const activeEnrollments = allEnrollments.filter(e => e.status === 'active');
      const completedEnrollments = allEnrollments.filter(e => e.status === 'completed');

      const totalLessonsCompleted = allEnrollments.reduce(
        (sum, e) => sum + e.lessonsProgress.filter(lp => lp.completed).length,
        0
      );

      const averageProgress = activeEnrollments.length > 0
        ? activeEnrollments.reduce((sum, e) => sum + e.progress, 0) / activeEnrollments.length
        : 0;

      const progress: IStudentProgressDTO = {
        totalCourses: allEnrollments.length,
        completedCourses: completedEnrollments.length,
        inProgressCourses: activeEnrollments.length,
        averageProgress: Math.round(averageProgress),
        totalLessonsCompleted,
        totalQuizzesPassed: 0, // Would come from quiz service
        averageQuizScore: 0, // Would come from quiz service
        recentActivity: [], // Would be populated from activity tracking
      };

      return { success: true, data: progress };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateLessonProgress(
    enrollmentId: string, 
    dto: IUpdateLessonProgressDTO
  ): Promise<IApiResponseDTO<IEnrollmentResponseDTO>> {
    try {
      const enrollment = await this.enrollmentRepository.findById(enrollmentId);
      if (!enrollment) {
        return { success: false, error: 'Enrollment not found' };
      }

      enrollment.updateLessonProgress(dto.lessonId, dto.completed, dto.watchTime);

      // Check if course is completed
      const lessons = await this.lessonRepository.findByCourse(enrollment.courseId);
      const allCompleted = lessons.every(lesson =>
        enrollment.lessonsProgress.some(lp => lp.lessonId === lesson.id && lp.completed)
      );

      if (allCompleted && enrollment.progress === 100) {
        enrollment.complete();
      }

      await this.enrollmentRepository.update(enrollment);

      return {
        success: true,
        data: this.enrollmentMapper.toResponseDTO(enrollment),
        message: dto.completed ? 'Lesson marked as completed' : 'Progress updated',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async isEnrolled(studentId: string, courseId: string): Promise<boolean> {
    return this.enrollmentRepository.isEnrolled(courseId, studentId);
  }

  async completeCourse(enrollmentId: string): Promise<IApiResponseDTO<IEnrollmentResponseDTO>> {
    try {
      const enrollment = await this.enrollmentRepository.findById(enrollmentId);
      if (!enrollment) {
        return { success: false, error: 'Enrollment not found' };
      }

      enrollment.complete();
      await this.enrollmentRepository.update(enrollment);

      return {
        success: true,
        data: this.enrollmentMapper.toResponseDTO(enrollment),
        message: 'Course completed! Congratulations!',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: unknown): IApiResponseDTO<T> {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.error('EnrollmentService error:', error);
    return { success: false, error: message };
  }
}
