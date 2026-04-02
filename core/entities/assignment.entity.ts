import { BaseEntity, IBaseEntity } from './base.entity';

export type AssignmentStatus = 'draft' | 'published' | 'closed';
export type SubmissionStatus = 'pending' | 'submitted' | 'late' | 'graded';

export interface IAssignmentAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface IAssignment extends IBaseEntity {
  courseId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxPoints: number;
  allowLateSubmission: boolean;
  latePenalty: number; // percentage deduction per day
  attachments: IAssignmentAttachment[];
  allowedFileTypes: string[];
  maxFileSize: number; // in MB
  status: AssignmentStatus;
}

export class AssignmentEntity extends BaseEntity implements IAssignment {
  courseId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxPoints: number;
  allowLateSubmission: boolean;
  latePenalty: number;
  attachments: IAssignmentAttachment[];
  allowedFileTypes: string[];
  maxFileSize: number;
  status: AssignmentStatus;

  constructor(data: Partial<IAssignment>) {
    super(data);
    this.courseId = data.courseId ?? '';
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.instructions = data.instructions ?? '';
    this.dueDate = data.dueDate ?? new Date();
    this.maxPoints = data.maxPoints ?? 100;
    this.allowLateSubmission = data.allowLateSubmission ?? true;
    this.latePenalty = data.latePenalty ?? 10;
    this.attachments = data.attachments ?? [];
    this.allowedFileTypes = data.allowedFileTypes ?? ['.pdf', '.doc', '.docx', '.zip'];
    this.maxFileSize = data.maxFileSize ?? 10;
    this.status = data.status ?? 'draft';
  }

  isOverdue(): boolean {
    return new Date() > this.dueDate;
  }

  daysUntilDue(): number {
    const diff = this.dueDate.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  publish(): void {
    this.status = 'published';
    this.touch();
  }

  close(): void {
    this.status = 'closed';
    this.touch();
  }
}
