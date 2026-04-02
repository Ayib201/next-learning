import { IBaseDTO, IFilterDTO } from './base.dto';
import { AssignmentStatus, SubmissionStatus, IAssignmentAttachment } from '../entities/assignment.entity';

// Response DTOs
export interface IAssignmentResponseDTO extends IBaseDTO {
  courseId: string;
  courseName?: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
  allowLateSubmission: boolean;
  latePenalty: number;
  attachments: IAssignmentAttachment[];
  allowedFileTypes: string[];
  maxFileSize: number;
  status: AssignmentStatus;
  isOverdue: boolean;
  daysUntilDue: number;
}

export interface IAssignmentCardDTO {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  maxPoints: number;
  status: AssignmentStatus;
  submissionStatus?: SubmissionStatus;
  grade?: number;
  isOverdue: boolean;
  daysUntilDue: number;
}

// Submission DTOs
export interface ISubmissionResponseDTO extends IBaseDTO {
  assignmentId: string;
  assignmentTitle?: string;
  studentId: string;
  studentName?: string;
  content: string;
  attachments: IAssignmentAttachment[];
  status: SubmissionStatus;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface ISubmissionDetailDTO extends ISubmissionResponseDTO {
  assignment: IAssignmentResponseDTO;
}

// Request DTOs
export interface ICreateAssignmentDTO {
  courseId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxPoints?: number;
  allowLateSubmission?: boolean;
  latePenalty?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number;
}

export interface IUpdateAssignmentDTO {
  title?: string;
  description?: string;
  instructions?: string;
  dueDate?: string;
  maxPoints?: number;
  allowLateSubmission?: boolean;
  latePenalty?: number;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  status?: AssignmentStatus;
}

export interface ICreateSubmissionDTO {
  assignmentId: string;
  content: string;
  attachments?: IAssignmentAttachment[];
}

export interface IUpdateSubmissionDTO {
  content?: string;
  attachments?: IAssignmentAttachment[];
}

export interface IGradeSubmissionDTO {
  grade: number;
  feedback: string;
}

// Filter DTOs
export interface IAssignmentFilterDTO extends IFilterDTO {
  courseId?: string;
  status?: AssignmentStatus;
  dueAfter?: string;
  dueBefore?: string;
}

export interface ISubmissionFilterDTO extends IFilterDTO {
  assignmentId?: string;
  studentId?: string;
  status?: SubmissionStatus;
}
