import { InMemoryRepository } from './base.repository';
import { QuizEntity } from '../entities/quiz.entity';
import { QuizAttemptEntity } from '../entities/quiz-attempt.entity';
import { IQuizFilterDTO, IQuizAttemptFilterDTO } from '../dtos/quiz.dto';
import { IPaginatedResponseDTO } from '../dtos/base.dto';

export interface IQuizRepository {
  findByCourse(courseId: string): Promise<QuizEntity[]>;
  findByLesson(lessonId: string): Promise<QuizEntity[]>;
  findPublishedByCourse(courseId: string): Promise<QuizEntity[]>;
}

export class QuizRepository extends InMemoryRepository<QuizEntity> implements IQuizRepository {

  async findByCourse(courseId: string): Promise<QuizEntity[]> {
    return this.findMany(quiz => quiz.courseId === courseId);
  }

  async findByLesson(lessonId: string): Promise<QuizEntity[]> {
    return this.findMany(quiz => quiz.lessonId === lessonId);
  }

  async findPublishedByCourse(courseId: string): Promise<QuizEntity[]> {
    return this.findMany(quiz => 
      quiz.courseId === courseId && quiz.isPublished
    );
  }

  async paginateWithFilter(filter: IQuizFilterDTO): Promise<IPaginatedResponseDTO<QuizEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    if (filter.courseId) {
      results = results.filter(q => q.courseId === filter.courseId);
    }
    if (filter.isPublished !== undefined) {
      results = results.filter(q => q.isPublished === filter.isPublished);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      results = results.filter(q =>
        q.title.toLowerCase().includes(search) ||
        q.description.toLowerCase().includes(search)
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

// Quiz Attempt Repository
export interface IQuizAttemptRepository {
  findByQuiz(quizId: string): Promise<QuizAttemptEntity[]>;
  findByStudent(studentId: string): Promise<QuizAttemptEntity[]>;
  findByQuizAndStudent(quizId: string, studentId: string): Promise<QuizAttemptEntity[]>;
  getAttemptCount(quizId: string, studentId: string): Promise<number>;
  getLastAttempt(quizId: string, studentId: string): Promise<QuizAttemptEntity | null>;
  getBestAttempt(quizId: string, studentId: string): Promise<QuizAttemptEntity | null>;
}

export class QuizAttemptRepository extends InMemoryRepository<QuizAttemptEntity> implements IQuizAttemptRepository {

  async findByQuiz(quizId: string): Promise<QuizAttemptEntity[]> {
    return this.findMany(attempt => attempt.quizId === quizId);
  }

  async findByStudent(studentId: string): Promise<QuizAttemptEntity[]> {
    return this.findMany(attempt => attempt.studentId === studentId);
  }

  async findByQuizAndStudent(quizId: string, studentId: string): Promise<QuizAttemptEntity[]> {
    return this.findMany(attempt => 
      attempt.quizId === quizId && attempt.studentId === studentId
    );
  }

  async getAttemptCount(quizId: string, studentId: string): Promise<number> {
    const attempts = await this.findByQuizAndStudent(quizId, studentId);
    return attempts.length;
  }

  async getLastAttempt(quizId: string, studentId: string): Promise<QuizAttemptEntity | null> {
    const attempts = await this.findByQuizAndStudent(quizId, studentId);
    if (attempts.length === 0) return null;
    return attempts.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())[0];
  }

  async getBestAttempt(quizId: string, studentId: string): Promise<QuizAttemptEntity | null> {
    const attempts = await this.findByQuizAndStudent(quizId, studentId);
    const completed = attempts.filter(a => a.status === 'completed');
    if (completed.length === 0) return null;
    return completed.sort((a, b) => b.score - a.score)[0];
  }

  async paginateWithFilter(filter: IQuizAttemptFilterDTO): Promise<IPaginatedResponseDTO<QuizAttemptEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    if (filter.quizId) {
      results = results.filter(a => a.quizId === filter.quizId);
    }
    if (filter.studentId) {
      results = results.filter(a => a.studentId === filter.studentId);
    }
    if (filter.status) {
      results = results.filter(a => a.status === filter.status);
    }
    if (filter.passed !== undefined) {
      results = results.filter(a => a.passed === filter.passed);
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

export const quizRepository = new QuizRepository();
export const quizAttemptRepository = new QuizAttemptRepository();
