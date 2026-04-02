import { InMemoryRepository } from './base.repository';
import { EnrollmentEntity, EnrollmentStatus } from '../entities/enrollment.entity';
import { IEnrollmentFilterDTO } from '../dtos/enrollment.dto';
import { IPaginatedResponseDTO } from '../dtos/base.dto';

export interface IEnrollmentRepository {
  findByCourse(courseId: string): Promise<EnrollmentEntity[]>;
  findByStudent(studentId: string): Promise<EnrollmentEntity[]>;
  findByCourseAndStudent(courseId: string, studentId: string): Promise<EnrollmentEntity | null>;
  findActiveByStudent(studentId: string): Promise<EnrollmentEntity[]>;
  findCompletedByStudent(studentId: string): Promise<EnrollmentEntity[]>;
  isEnrolled(courseId: string, studentId: string): Promise<boolean>;
  countByCourse(courseId: string): Promise<number>;
  countActiveByStudent(studentId: string): Promise<number>;
}

export class EnrollmentRepository extends InMemoryRepository<EnrollmentEntity> implements IEnrollmentRepository {

  async findByCourse(courseId: string): Promise<EnrollmentEntity[]> {
    return this.findMany(enrollment => enrollment.courseId === courseId);
  }

  async findByStudent(studentId: string): Promise<EnrollmentEntity[]> {
    return this.findMany(enrollment => enrollment.studentId === studentId);
  }

  async findByCourseAndStudent(courseId: string, studentId: string): Promise<EnrollmentEntity | null> {
    return this.findOne(enrollment =>
      enrollment.courseId === courseId && enrollment.studentId === studentId
    );
  }

  async findActiveByStudent(studentId: string): Promise<EnrollmentEntity[]> {
    return this.findMany(enrollment =>
      enrollment.studentId === studentId && enrollment.status === 'active'
    );
  }

  async findCompletedByStudent(studentId: string): Promise<EnrollmentEntity[]> {
    return this.findMany(enrollment =>
      enrollment.studentId === studentId && enrollment.status === 'completed'
    );
  }

  async isEnrolled(courseId: string, studentId: string): Promise<boolean> {
    const enrollment = await this.findByCourseAndStudent(courseId, studentId);
    return enrollment !== null && enrollment.status !== 'dropped';
  }

  async countByCourse(courseId: string): Promise<number> {
    const enrollments = await this.findByCourse(courseId);
    return enrollments.filter(e => e.status !== 'dropped').length;
  }

  async countActiveByStudent(studentId: string): Promise<number> {
    const enrollments = await this.findActiveByStudent(studentId);
    return enrollments.length;
  }

  async paginateWithFilter(filter: IEnrollmentFilterDTO): Promise<IPaginatedResponseDTO<EnrollmentEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    if (filter.courseId) {
      results = results.filter(e => e.courseId === filter.courseId);
    }
    if (filter.studentId) {
      results = results.filter(e => e.studentId === filter.studentId);
    }
    if (filter.status) {
      results = results.filter(e => e.status === filter.status);
    }
    
    if (filter.sortBy) {
      results = this.sortItems(results, filter.sortBy, filter.sortOrder ?? 'asc');
    }
    
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = results.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedData,
      pagination: { page, limit, total, totalPages },
    };
  }
}

export const enrollmentRepository = new EnrollmentRepository();
