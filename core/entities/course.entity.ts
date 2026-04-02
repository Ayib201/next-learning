import { BaseEntity, IBaseEntity } from './base.entity';

export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseCategory = 'informatique' | 'mathematiques' | 'physique' | 'chimie' | 'langues' | 'gestion' | 'autre';

export interface ICourse extends IBaseEntity {
  title: string;
  description: string;
  shortDescription: string;
  teacherId: string;
  category: CourseCategory;
  level: CourseLevel;
  status: CourseStatus;
  thumbnail?: string;
  duration: number; // in hours
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  tags: string[];
}

export class CourseEntity extends BaseEntity implements ICourse {
  title: string;
  description: string;
  shortDescription: string;
  teacherId: string;
  category: CourseCategory;
  level: CourseLevel;
  status: CourseStatus;
  thumbnail?: string;
  duration: number;
  totalLessons: number;
  enrolledCount: number;
  rating: number;
  tags: string[];

  constructor(data: Partial<ICourse>) {
    super(data);
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.shortDescription = data.shortDescription ?? '';
    this.teacherId = data.teacherId ?? '';
    this.category = data.category ?? 'informatique';
    this.level = data.level ?? 'beginner';
    this.status = data.status ?? 'draft';
    this.thumbnail = data.thumbnail;
    this.duration = data.duration ?? 0;
    this.totalLessons = data.totalLessons ?? 0;
    this.enrolledCount = data.enrolledCount ?? 0;
    this.rating = data.rating ?? 0;
    this.tags = data.tags ?? [];
  }

  isPublished(): boolean {
    return this.status === 'published';
  }

  isDraft(): boolean {
    return this.status === 'draft';
  }

  publish(): void {
    this.status = 'published';
    this.touch();
  }

  archive(): void {
    this.status = 'archived';
    this.touch();
  }
}
