import { BaseService } from './base.service';
import { CourseEntity } from '../entities/course.entity';
import { CourseRepository } from '../repositories/course.repository';
import { LessonRepository } from '../repositories/lesson.repository';
import { QuizRepository } from '../repositories/quiz.repository';
import { AssignmentRepository } from '../repositories/assignment.repository';
import { UserRepository } from '../repositories/user.repository';
import { CourseMapper } from '../mappers/course.mapper';
import { UserMapper } from '../mappers/user.mapper';
import {
  ICourseResponseDTO,
  ICourseDetailDTO,
  ICourseCardDTO,
  ICreateCourseDTO,
  IUpdateCourseDTO,
  ICourseFilterDTO,
} from '../dtos/course.dto';
import { IApiResponseDTO, IPaginatedResponseDTO } from '../dtos/base.dto';

export interface ICourseService {
  getCourseDetail(courseId: string): Promise<IApiResponseDTO<ICourseDetailDTO>>;
  getCourseCards(filter?: ICourseFilterDTO): Promise<IApiResponseDTO<ICourseCardDTO[]>>;
  getTeacherCourses(teacherId: string): Promise<IApiResponseDTO<ICourseCardDTO[]>>;
  getPopularCourses(limit?: number): Promise<IApiResponseDTO<ICourseCardDTO[]>>;
  publishCourse(courseId: string): Promise<IApiResponseDTO<ICourseResponseDTO>>;
  archiveCourse(courseId: string): Promise<IApiResponseDTO<ICourseResponseDTO>>;
  searchCourses(filter: ICourseFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<ICourseCardDTO>>>;
}

export class CourseService
  extends BaseService<CourseEntity, ICourseResponseDTO, ICreateCourseDTO, IUpdateCourseDTO>
  implements ICourseService {

  constructor(
    protected courseRepository: CourseRepository,
    protected lessonRepository: LessonRepository,
    protected quizRepository: QuizRepository,
    protected assignmentRepository: AssignmentRepository,
    protected userRepository: UserRepository,
    protected courseMapper: CourseMapper,
    protected userMapper: UserMapper
  ) {
    super(courseRepository, courseMapper);
  }

  // Override create to include teacherId
  async createCourse(dto: ICreateCourseDTO, teacherId: string): Promise<IApiResponseDTO<ICourseResponseDTO>> {
    try {
      const entity = this.courseMapper.toEntity(dto, teacherId);
      const created = await this.courseRepository.create(entity);
      
      const teacher = await this.userRepository.findById(teacherId);
      const teacherProfile = teacher ? this.userMapper.toProfileDTO(teacher) : undefined;
      
      const responseDTO = this.courseMapper.toResponseDTO(created, teacherProfile);
      return { success: true, data: responseDTO, message: 'Course created successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCourseDetail(courseId: string): Promise<IApiResponseDTO<ICourseDetailDTO>> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const teacher = await this.userRepository.findById(course.teacherId);
      const teacherProfile = teacher ? this.userMapper.toProfileDTO(teacher) : {
        id: course.teacherId,
        email: '',
        firstName: 'Unknown',
        lastName: 'Teacher',
        fullName: 'Unknown Teacher',
        role: 'teacher' as const,
      };

      const lessons = await this.lessonRepository.findByCourseOrdered(courseId);
      const quizzes = await this.quizRepository.findByCourse(courseId);
      const assignments = await this.assignmentRepository.findByCourse(courseId);

      const detail = this.courseMapper.toDetailDTO(
        course,
        teacherProfile,
        lessons,
        quizzes.length,
        assignments.length
      );

      return { success: true, data: detail };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCourseCards(filter?: ICourseFilterDTO): Promise<IApiResponseDTO<ICourseCardDTO[]>> {
    try {
      const courses = filter 
        ? (await this.courseRepository.paginateWithFilter({ ...filter, limit: 100 })).data
        : await this.courseRepository.findPublished();

      const cards = await Promise.all(
        courses.map(async (course) => {
          const teacher = await this.userRepository.findById(course.teacherId);
          return this.courseMapper.toCardDTO(course, teacher?.fullName ?? 'Unknown');
        })
      );

      return { success: true, data: cards };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTeacherCourses(teacherId: string): Promise<IApiResponseDTO<ICourseCardDTO[]>> {
    try {
      const courses = await this.courseRepository.findByTeacher(teacherId);
      const teacher = await this.userRepository.findById(teacherId);
      const teacherName = teacher?.fullName ?? 'Unknown';

      const cards = courses.map(course => 
        this.courseMapper.toCardDTO(course, teacherName)
      );

      return { success: true, data: cards };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPopularCourses(limit: number = 6): Promise<IApiResponseDTO<ICourseCardDTO[]>> {
    try {
      const courses = await this.courseRepository.findPopular(limit);
      
      const cards = await Promise.all(
        courses.map(async (course) => {
          const teacher = await this.userRepository.findById(course.teacherId);
          return this.courseMapper.toCardDTO(course, teacher?.fullName ?? 'Unknown');
        })
      );

      return { success: true, data: cards };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async publishCourse(courseId: string): Promise<IApiResponseDTO<ICourseResponseDTO>> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      course.publish();
      await this.courseRepository.update(course);

      const teacher = await this.userRepository.findById(course.teacherId);
      const teacherProfile = teacher ? this.userMapper.toProfileDTO(teacher) : undefined;

      return {
        success: true,
        data: this.courseMapper.toResponseDTO(course, teacherProfile),
        message: 'Course published successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async archiveCourse(courseId: string): Promise<IApiResponseDTO<ICourseResponseDTO>> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      course.archive();
      await this.courseRepository.update(course);

      return {
        success: true,
        data: this.courseMapper.toResponseDTO(course),
        message: 'Course archived successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async searchCourses(filter: ICourseFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<ICourseCardDTO>>> {
    try {
      const result = await this.courseRepository.paginateWithFilter(filter);
      
      const cards = await Promise.all(
        result.data.map(async (course) => {
          const teacher = await this.userRepository.findById(course.teacherId);
          return this.courseMapper.toCardDTO(course, teacher?.fullName ?? 'Unknown');
        })
      );

      return {
        success: true,
        data: {
          data: cards,
          pagination: result.pagination,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
