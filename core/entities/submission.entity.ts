import { BaseEntity, IBaseEntity } from './base.entity';
import { SubmissionStatus, IAssignmentAttachment } from './assignment.entity';

export interface ISubmission extends IBaseEntity {
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: IAssignmentAttachment[];
  status: SubmissionStatus;
  submittedAt?: Date;
  grade?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
}

export class SubmissionEntity extends BaseEntity implements ISubmission {
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: IAssignmentAttachment[];
  status: SubmissionStatus;
  submittedAt?: Date;
  grade?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;

  constructor(data: Partial<ISubmission>) {
    super(data);
    this.assignmentId = data.assignmentId ?? '';
    this.studentId = data.studentId ?? '';
    this.content = data.content ?? '';
    this.attachments = data.attachments ?? [];
    this.status = data.status ?? 'pending';
    this.submittedAt = data.submittedAt;
    this.grade = data.grade;
    this.feedback = data.feedback;
    this.gradedAt = data.gradedAt;
    this.gradedBy = data.gradedBy;
  }

  submit(): void {
    this.status = 'submitted';
    this.submittedAt = new Date();
    this.touch();
  }

  markAsLate(): void {
    this.status = 'late';
    this.touch();
  }

  setGrade(grade: number, feedback: string, gradedBy: string): void {
    this.grade = grade;
    this.feedback = feedback;
    this.gradedBy = gradedBy;
    this.gradedAt = new Date();
    this.status = 'graded';
    this.touch();
  }

  isGraded(): boolean {
    return this.status === 'graded';
  }

  addAttachment(attachment: IAssignmentAttachment): void {
    this.attachments.push(attachment);
    this.touch();
  }
}
