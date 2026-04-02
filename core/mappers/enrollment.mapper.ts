import { BaseMapper } from './base.mapper';
import { EnrollmentEntity, IEnrollment, ILessonProgress } from '../entities/enrollment.entity';
import { LessonEntity } from '../entities/lesson.entity';
import {
  IEnrollmentResponseDTO,
  IEnrollmentDetailDTO,
  ILessonProgressDTO,
  IStudentCourseDTO,
  ICreateEnrollmentDTO,
} from '../dtos/enrollment.dto';
import { ICourseCardDTO } from '../dtos/course.dto';

export class EnrollmentMapper extends BaseMapper<
  EnrollmentEntity,
  IEnrollmentResponseDTO,
  ICreateEnrollmentDTO
> {

  toResponseDTO(entity: EnrollmentEntity): IEnrollmentResponseDTO {
    return {
      id: entity.id,
      courseId: entity.courseId,
      studentId: entity.studentId,
      status: entity.status,
      enrolledAt: entity.enrolledAt.toISOString(),
      completedAt: entity.completedAt?.toISOString(),
      progress: entity.progress,
      lastAccessedAt: entity.lastAccessedAt?.toISOString(),
      certificateId: entity.certificateId,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toDetailDTO(
    entity: EnrollmentEntity,
    course: ICourseCardDTO,
    lessons: LessonEntity[]
  ): IEnrollmentDetailDTO {
    return {
      ...this.toResponseDTO(entity),
      course,
      lessonsProgress: entity.lessonsProgress.map(lp => 
        this.toLessonProgressDTO(lp, lessons.find(l => l.id === lp.lessonId))
      ),
    };
  }

  toLessonProgressDTO(progress: ILessonProgress, lesson?: LessonEntity): ILessonProgressDTO {
    return {
      lessonId: progress.lessonId,
      lessonTitle: lesson?.title ?? '',
      completed: progress.completed,
      completedAt: progress.completedAt?.toISOString(),
      watchTime: progress.watchTime,
    };
  }

  toStudentCourseDTO(
    entity: EnrollmentEntity,
    course: ICourseCardDTO,
    nextLesson?: { id: string; title: string; order: number }
  ): IStudentCourseDTO {
    return {
      enrollment: this.toResponseDTO(entity),
      course: {
        ...course,
        progress: entity.progress,
      },
      nextLesson,
      recentActivity: entity.lastAccessedAt?.toISOString(),
    };
  }

  toEntity(dto: ICreateEnrollmentDTO, studentId: string): EnrollmentEntity {
    return new EnrollmentEntity({
      courseId: dto.courseId,
      studentId,
    });
  }

  updateEntity(entity: EnrollmentEntity): EnrollmentEntity {
    entity.touch();
    return entity;
  }

  fromRaw(data: IEnrollment): EnrollmentEntity {
    return new EnrollmentEntity(data);
  }
}

export const enrollmentMapper = new EnrollmentMapper();
