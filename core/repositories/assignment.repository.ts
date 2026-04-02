import { InMemoryRepository } from './base.repository';
import { AssignmentEntity, AssignmentStatus, SubmissionStatus } from '../entities/assignment.entity';
import { SubmissionEntity } from '../entities/submission.entity';
import { IAssignmentFilterDTO, ISubmissionFilterDTO } from '../dtos/assignment.dto';
import { IPaginatedResponseDTO } from '../dtos/base.dto';

export interface IAssignmentRepository {
  findByCourse(courseId: string): Promise<AssignmentEntity[]>;
  findPublishedByCourse(courseId: string): Promise<AssignmentEntity[]>;
  findUpcoming(daysAhead?: number): Promise<AssignmentEntity[]>;
  findOverdue(): Promise<AssignmentEntity[]>;
}

export class AssignmentRepository extends InMemoryRepository<AssignmentEntity> implements IAssignmentRepository {

  async findByCourse(courseId: string): Promise<AssignmentEntity[]> {
    return this.findMany(assignment => assignment.courseId === courseId);
  }

  async findPublishedByCourse(courseId: string): Promise<AssignmentEntity[]> {
    return this.findMany(assignment => 
      assignment.courseId === courseId && assignment.status === 'published'
    );
  }

  async findUpcoming(daysAhead: number = 7): Promise<AssignmentEntity[]> {
    const now = new Date();
    const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    
    return this.findMany(assignment =>
      assignment.status === 'published' &&
      assignment.dueDate > now &&
      assignment.dueDate <= futureDate
    );
  }

  async findOverdue(): Promise<AssignmentEntity[]> {
    const now = new Date();
    return this.findMany(assignment =>
      assignment.status === 'published' &&
      assignment.dueDate < now
    );
  }

  async paginateWithFilter(filter: IAssignmentFilterDTO): Promise<IPaginatedResponseDTO<AssignmentEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    if (filter.courseId) {
      results = results.filter(a => a.courseId === filter.courseId);
    }
    if (filter.status) {
      results = results.filter(a => a.status === filter.status);
    }
    if (filter.dueAfter) {
      const date = new Date(filter.dueAfter);
      results = results.filter(a => a.dueDate >= date);
    }
    if (filter.dueBefore) {
      const date = new Date(filter.dueBefore);
      results = results.filter(a => a.dueDate <= date);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      results = results.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search)
      );
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

// Submission Repository
export interface ISubmissionRepository {
  findByAssignment(assignmentId: string): Promise<SubmissionEntity[]>;
  findByStudent(studentId: string): Promise<SubmissionEntity[]>;
  findByAssignmentAndStudent(assignmentId: string, studentId: string): Promise<SubmissionEntity | null>;
  findPendingGrading(): Promise<SubmissionEntity[]>;
  countByStatus(assignmentId: string, status: SubmissionStatus): Promise<number>;
}

export class SubmissionRepository extends InMemoryRepository<SubmissionEntity> implements ISubmissionRepository {

  async findByAssignment(assignmentId: string): Promise<SubmissionEntity[]> {
    return this.findMany(submission => submission.assignmentId === assignmentId);
  }

  async findByStudent(studentId: string): Promise<SubmissionEntity[]> {
    return this.findMany(submission => submission.studentId === studentId);
  }

  async findByAssignmentAndStudent(assignmentId: string, studentId: string): Promise<SubmissionEntity | null> {
    return this.findOne(submission =>
      submission.assignmentId === assignmentId && submission.studentId === studentId
    );
  }

  async findPendingGrading(): Promise<SubmissionEntity[]> {
    return this.findMany(submission =>
      submission.status === 'submitted' || submission.status === 'late'
    );
  }

  async countByStatus(assignmentId: string, status: SubmissionStatus): Promise<number> {
    const submissions = await this.findByAssignment(assignmentId);
    return submissions.filter(s => s.status === status).length;
  }

  async paginateWithFilter(filter: ISubmissionFilterDTO): Promise<IPaginatedResponseDTO<SubmissionEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    if (filter.assignmentId) {
      results = results.filter(s => s.assignmentId === filter.assignmentId);
    }
    if (filter.studentId) {
      results = results.filter(s => s.studentId === filter.studentId);
    }
    if (filter.status) {
      results = results.filter(s => s.status === filter.status);
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

export const assignmentRepository = new AssignmentRepository();
export const submissionRepository = new SubmissionRepository();
