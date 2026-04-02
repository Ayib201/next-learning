import { BaseEntity, IBaseEntity } from './base.entity';

export type EnrollmentStatus = 'active' | 'completed' | 'dropped' | 'suspended';

export interface ILessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  watchTime?: number; // in seconds
  lastPosition?: number; // for video
}

export interface IEnrollment extends IBaseEntity {
  courseId: string;
  studentId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // percentage
  lessonsProgress: ILessonProgress[];
  lastAccessedAt?: Date;
  certificateId?: string;
}

export class EnrollmentEntity extends BaseEntity implements IEnrollment {
  courseId: string;
  studentId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number;
  lessonsProgress: ILessonProgress[];
  lastAccessedAt?: Date;
  certificateId?: string;

  constructor(data: Partial<IEnrollment>) {
    super(data);
    this.courseId = data.courseId ?? '';
    this.studentId = data.studentId ?? '';
    this.status = data.status ?? 'active';
    this.enrolledAt = data.enrolledAt ?? new Date();
    this.completedAt = data.completedAt;
    this.progress = data.progress ?? 0;
    this.lessonsProgress = data.lessonsProgress ?? [];
    this.lastAccessedAt = data.lastAccessedAt;
    this.certificateId = data.certificateId;
  }

  updateLessonProgress(lessonId: string, completed: boolean, watchTime?: number): void {
    const existingProgress = this.lessonsProgress.find(lp => lp.lessonId === lessonId);
    
    if (existingProgress) {
      existingProgress.completed = completed;
      existingProgress.watchTime = watchTime ?? existingProgress.watchTime;
      if (completed && !existingProgress.completedAt) {
        existingProgress.completedAt = new Date();
      }
    } else {
      this.lessonsProgress.push({
        lessonId,
        completed,
        completedAt: completed ? new Date() : undefined,
        watchTime
      });
    }

    this.calculateProgress();
    this.lastAccessedAt = new Date();
    this.touch();
  }

  calculateProgress(): void {
    if (this.lessonsProgress.length === 0) {
      this.progress = 0;
      return;
    }
    const completedCount = this.lessonsProgress.filter(lp => lp.completed).length;
    this.progress = Math.round((completedCount / this.lessonsProgress.length) * 100);
  }

  complete(): void {
    this.status = 'completed';
    this.completedAt = new Date();
    this.progress = 100;
    this.touch();
  }

  drop(): void {
    this.status = 'dropped';
    this.touch();
  }

  isCompleted(): boolean {
    return this.status === 'completed';
  }

  isActive(): boolean {
    return this.status === 'active';
  }
}
