import { InMemoryRepository } from './base.repository';
import { LessonEntity } from '../entities/lesson.entity';

export interface ILessonRepository {
  findByCourse(courseId: string): Promise<LessonEntity[]>;
  findByCourseOrdered(courseId: string): Promise<LessonEntity[]>;
  findPublishedByCourse(courseId: string): Promise<LessonEntity[]>;
  findFreeLessons(courseId: string): Promise<LessonEntity[]>;
  getNextOrder(courseId: string): Promise<number>;
  reorderLessons(courseId: string, lessonIds: string[]): Promise<void>;
}

export class LessonRepository extends InMemoryRepository<LessonEntity> implements ILessonRepository {

  async findByCourse(courseId: string): Promise<LessonEntity[]> {
    return this.findMany(lesson => lesson.courseId === courseId);
  }

  async findByCourseOrdered(courseId: string): Promise<LessonEntity[]> {
    const lessons = await this.findByCourse(courseId);
    return lessons.sort((a, b) => a.order - b.order);
  }

  async findPublishedByCourse(courseId: string): Promise<LessonEntity[]> {
    return this.findMany(lesson => 
      lesson.courseId === courseId && lesson.isPublished
    );
  }

  async findFreeLessons(courseId: string): Promise<LessonEntity[]> {
    return this.findMany(lesson =>
      lesson.courseId === courseId && lesson.isFree && lesson.isPublished
    );
  }

  async getNextOrder(courseId: string): Promise<number> {
    const lessons = await this.findByCourse(courseId);
    if (lessons.length === 0) return 1;
    return Math.max(...lessons.map(l => l.order)) + 1;
  }

  async reorderLessons(courseId: string, lessonIds: string[]): Promise<void> {
    for (let i = 0; i < lessonIds.length; i++) {
      const lesson = await this.findById(lessonIds[i]);
      if (lesson && lesson.courseId === courseId) {
        lesson.order = i + 1;
        lesson.touch();
        await this.update(lesson);
      }
    }
  }

  protected search(items: LessonEntity[], searchTerm: string): LessonEntity[] {
    const term = searchTerm.toLowerCase();
    return items.filter(lesson =>
      lesson.title.toLowerCase().includes(term) ||
      lesson.description.toLowerCase().includes(term)
    );
  }
}

export const lessonRepository = new LessonRepository();
