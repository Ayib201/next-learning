import { BaseEntity, IBaseEntity } from './base.entity';

export type LessonType = 'video' | 'document' | 'interactive' | 'quiz';
export type ContentType = 'video' | 'pdf' | 'slides' | 'text' | 'audio';

export interface ILessonContent {
  type: ContentType;
  url: string;
  title: string;
  duration?: number; // in minutes for video/audio
}

export interface ILesson extends IBaseEntity {
  courseId: string;
  title: string;
  description: string;
  type: LessonType;
  content: ILessonContent[];
  order: number;
  duration: number; // in minutes
  isPublished: boolean;
  isFree: boolean; // preview lesson
}

export class LessonEntity extends BaseEntity implements ILesson {
  courseId: string;
  title: string;
  description: string;
  type: LessonType;
  content: ILessonContent[];
  order: number;
  duration: number;
  isPublished: boolean;
  isFree: boolean;

  constructor(data: Partial<ILesson>) {
    super(data);
    this.courseId = data.courseId ?? '';
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.type = data.type ?? 'video';
    this.content = data.content ?? [];
    this.order = data.order ?? 0;
    this.duration = data.duration ?? 0;
    this.isPublished = data.isPublished ?? false;
    this.isFree = data.isFree ?? false;
  }

  addContent(content: ILessonContent): void {
    this.content.push(content);
    this.touch();
  }

  removeContent(index: number): void {
    this.content.splice(index, 1);
    this.touch();
  }

  publish(): void {
    this.isPublished = true;
    this.touch();
  }

  unpublish(): void {
    this.isPublished = false;
    this.touch();
  }
}
