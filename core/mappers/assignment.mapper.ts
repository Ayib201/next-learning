import { BaseMapper } from './base.mapper';
import { AssignmentEntity, IAssignment } from '../entities/assignment.entity';
import { SubmissionEntity, ISubmission } from '../entities/submission.entity';
import {
  IAssignmentResponseDTO,
  IAssignmentCardDTO,
  ISubmissionResponseDTO,
  ISubmissionDetailDTO,
  ICreateAssignmentDTO,
  IUpdateAssignmentDTO,
  ICreateSubmissionDTO,
} from '../dtos/assignment.dto';
import { SubmissionStatus } from '../entities/assignment.entity';

export class AssignmentMapper extends BaseMapper<
  AssignmentEntity,
  IAssignmentResponseDTO,
  ICreateAssignmentDTO,
  IUpdateAssignmentDTO
> {

  toResponseDTO(entity: AssignmentEntity, courseName?: string): IAssignmentResponseDTO {
    return {
      id: entity.id,
      courseId: entity.courseId,
      courseName,
      title: entity.title,
      description: entity.description,
      instructions: entity.instructions,
      dueDate: entity.dueDate.toISOString(),
      maxPoints: entity.maxPoints,
      allowLateSubmission: entity.allowLateSubmission,
      latePenalty: entity.latePenalty,
      attachments: entity.attachments,
      allowedFileTypes: entity.allowedFileTypes,
      maxFileSize: entity.maxFileSize,
      status: entity.status,
      isOverdue: entity.isOverdue(),
      daysUntilDue: entity.daysUntilDue(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toCardDTO(
    entity: AssignmentEntity,
    courseName: string,
    submissionStatus?: SubmissionStatus,
    grade?: number
  ): IAssignmentCardDTO {
    return {
      id: entity.id,
      title: entity.title,
      courseName,
      dueDate: entity.dueDate.toISOString(),
      maxPoints: entity.maxPoints,
      status: entity.status,
      submissionStatus,
      grade,
      isOverdue: entity.isOverdue(),
      daysUntilDue: entity.daysUntilDue(),
    };
  }

  toEntity(dto: ICreateAssignmentDTO): AssignmentEntity {
    return new AssignmentEntity({
      courseId: dto.courseId,
      title: dto.title,
      description: dto.description,
      instructions: dto.instructions,
      dueDate: new Date(dto.dueDate),
      maxPoints: dto.maxPoints ?? 100,
      allowLateSubmission: dto.allowLateSubmission ?? true,
      latePenalty: dto.latePenalty ?? 10,
      allowedFileTypes: dto.allowedFileTypes ?? ['.pdf', '.doc', '.docx', '.zip'],
      maxFileSize: dto.maxFileSize ?? 10,
    });
  }

  updateEntity(entity: AssignmentEntity, dto: IUpdateAssignmentDTO): AssignmentEntity {
    if (dto.title !== undefined) entity.title = dto.title;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.instructions !== undefined) entity.instructions = dto.instructions;
    if (dto.dueDate !== undefined) entity.dueDate = new Date(dto.dueDate);
    if (dto.maxPoints !== undefined) entity.maxPoints = dto.maxPoints;
    if (dto.allowLateSubmission !== undefined) entity.allowLateSubmission = dto.allowLateSubmission;
    if (dto.latePenalty !== undefined) entity.latePenalty = dto.latePenalty;
    if (dto.allowedFileTypes !== undefined) entity.allowedFileTypes = dto.allowedFileTypes;
    if (dto.maxFileSize !== undefined) entity.maxFileSize = dto.maxFileSize;
    if (dto.status !== undefined) entity.status = dto.status;
    entity.touch();
    return entity;
  }

  // Submission Mappers
  toSubmissionResponseDTO(
    entity: SubmissionEntity,
    assignmentTitle?: string,
    studentName?: string
  ): ISubmissionResponseDTO {
    return {
      id: entity.id,
      assignmentId: entity.assignmentId,
      assignmentTitle,
      studentId: entity.studentId,
      studentName,
      content: entity.content,
      attachments: entity.attachments,
      status: entity.status,
      submittedAt: entity.submittedAt?.toISOString(),
      grade: entity.grade,
      feedback: entity.feedback,
      gradedAt: entity.gradedAt?.toISOString(),
      gradedBy: entity.gradedBy,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toSubmissionDetailDTO(
    entity: SubmissionEntity,
    assignment: AssignmentEntity
  ): ISubmissionDetailDTO {
    return {
      ...this.toSubmissionResponseDTO(entity, assignment.title),
      assignment: this.toResponseDTO(assignment),
    };
  }

  toSubmissionEntity(dto: ICreateSubmissionDTO, studentId: string): SubmissionEntity {
    return new SubmissionEntity({
      assignmentId: dto.assignmentId,
      studentId,
      content: dto.content,
      attachments: dto.attachments ?? [],
    });
  }

  fromRaw(data: IAssignment): AssignmentEntity {
    return new AssignmentEntity(data);
  }

  submissionFromRaw(data: ISubmission): SubmissionEntity {
    return new SubmissionEntity(data);
  }
}

export const assignmentMapper = new AssignmentMapper();
