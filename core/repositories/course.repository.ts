import { InMemoryRepository } from './base.repository';
import { CourseEntity, CourseCategory, CourseLevel, CourseStatus } from '../entities/course.entity';
import { ICourseFilterDTO } from '../dtos/course.dto';
import { IPaginatedResponseDTO } from '../dtos/base.dto';

export interface ICourseRepository {
  findByTeacher(teacherId: string): Promise<CourseEntity[]>;
  findByCategory(category: CourseCategory): Promise<CourseEntity[]>;
  findPublished(): Promise<CourseEntity[]>;
  findPopular(limit: number): Promise<CourseEntity[]>;
  incrementEnrollment(courseId: string): Promise<void>;
  decrementEnrollment(courseId: string): Promise<void>;
  updateRating(courseId: string, rating: number): Promise<void>;
}

export class CourseRepository extends InMemoryRepository<CourseEntity> implements ICourseRepository {

  async findByTeacher(teacherId: string): Promise<CourseEntity[]> {
    return this.findMany(course => course.teacherId === teacherId);
  }

  async findByCategory(category: CourseCategory): Promise<CourseEntity[]> {
    return this.findMany(course => course.category === category);
  }

  async findPublished(): Promise<CourseEntity[]> {
    return this.findMany(course => course.isPublished());
  }

  async findPopular(limit: number): Promise<CourseEntity[]> {
    const published = await this.findPublished();
    return published
      .sort((a, b) => b.enrolledCount - a.enrolledCount)
      .slice(0, limit);
  }

  async incrementEnrollment(courseId: string): Promise<void> {
    const course = await this.findById(courseId);
    if (course) {
      course.enrolledCount++;
      course.touch();
      await this.update(course);
    }
  }

  async decrementEnrollment(courseId: string): Promise<void> {
    const course = await this.findById(courseId);
    if (course && course.enrolledCount > 0) {
      course.enrolledCount--;
      course.touch();
      await this.update(course);
    }
  }

  async updateRating(courseId: string, rating: number): Promise<void> {
    const course = await this.findById(courseId);
    if (course) {
      course.rating = rating;
      course.touch();
      await this.update(course);
    }
  }

  async paginateWithFilter(filter: ICourseFilterDTO): Promise<IPaginatedResponseDTO<CourseEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    // Apply filters
    if (filter.category) {
      results = results.filter(c => c.category === filter.category);
    }
    if (filter.level) {
      results = results.filter(c => c.level === filter.level);
    }
    if (filter.status) {
      results = results.filter(c => c.status === filter.status);
    }
    if (filter.teacherId) {
      results = results.filter(c => c.teacherId === filter.teacherId);
    }
    if (filter.minRating !== undefined) {
      results = results.filter(c => c.rating >= filter.minRating!);
    }
    if (filter.tags && filter.tags.length > 0) {
      results = results.filter(c => 
        filter.tags!.some(tag => c.tags.includes(tag))
      );
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
      );
    }
    
    // Apply sorting
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

  protected search(items: CourseEntity[], searchTerm: string): CourseEntity[] {
    const term = searchTerm.toLowerCase();
    return items.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
}

export const courseRepository = new CourseRepository();
