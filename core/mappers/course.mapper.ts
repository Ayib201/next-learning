import { BaseMapper } from './base.mapper';
import { CourseEntity, ICourse } from '../entities/course.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { 
  ICourseResponseDTO, 
  ICourseDetailDTO,
  ICourseCardDTO,
  ILessonSummaryDTO,
  ICreateCourseDTO, 
  IUpdateCourseDTO 
} from '../dtos/course.dto';
import { IUserProfileDTO } from '../dtos/user.dto';

export class CourseMapper extends BaseMapper<CourseEntity, ICourseResponseDTO, ICreateCourseDTO, IUpdateCourseDTO> {
  
  toResponseDTO(entity: CourseEntity, teacher?: IUserProfileDTO): ICourseResponseDTO {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      shortDescription: entity.shortDescription,
      teacherId: entity.teacherId,
      teacher,
      category: entity.category,
      level: entity.level,
      status: entity.status,
      thumbnail: entity.thumbnail,
      duration: entity.duration,
      totalLessons: entity.totalLessons,
      enrolledCount: entity.enrolledCount,
      rating: entity.rating,
      tags: entity.tags,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toDetailDTO(
    entity: CourseEntity, 
    teacher: IUserProfileDTO,
    lessons: LessonEntity[],
    quizCount: number,
    assignmentCount: number
  ): ICourseDetailDTO {
    return {
      ...this.toResponseDTO(entity, teacher),
      lessons: lessons.map(l => this.toLessonSummaryDTO(l)),
      quizCount,
      assignmentCount,
    };
  }

  toCardDTO(entity: CourseEntity, teacherName: string, progress?: number): ICourseCardDTO {
    return {
      id: entity.id,
      title: entity.title,
      shortDescription: entity.shortDescription,
      thumbnail: entity.thumbnail,
      teacherName,
      category: entity.category,
      level: entity.level,
      duration: entity.duration,
      totalLessons: entity.totalLessons,
      enrolledCount: entity.enrolledCount,
      rating: entity.rating,
      progress,
    };
  }

  toLessonSummaryDTO(lesson: LessonEntity): ILessonSummaryDTO {
    return {
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      duration: lesson.duration,
      type: lesson.type,
      isFree: lesson.isFree,
    };
  }

  toEntity(dto: ICreateCourseDTO, teacherId: string): CourseEntity {
    return new CourseEntity({
      title: dto.title,
      description: dto.description,
      shortDescription: dto.shortDescription,
      teacherId,
      category: dto.category,
      level: dto.level,
      thumbnail: dto.thumbnail,
      tags: dto.tags ?? [],
    });
  }

  updateEntity(entity: CourseEntity, dto: IUpdateCourseDTO): CourseEntity {
    if (dto.title !== undefined) entity.title = dto.title;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.shortDescription !== undefined) entity.shortDescription = dto.shortDescription;
    if (dto.category !== undefined) entity.category = dto.category;
    if (dto.level !== undefined) entity.level = dto.level;
    if (dto.status !== undefined) entity.status = dto.status;
    if (dto.thumbnail !== undefined) entity.thumbnail = dto.thumbnail;
    if (dto.tags !== undefined) entity.tags = dto.tags;
    entity.touch();
    return entity;
  }

  fromRaw(data: ICourse): CourseEntity {
    return new CourseEntity(data);
  }
}

export const courseMapper = new CourseMapper();
