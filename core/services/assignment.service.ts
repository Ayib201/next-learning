import { AssignmentEntity } from '../entities/assignment.entity';
import { SubmissionEntity } from '../entities/submission.entity';
import { AssignmentRepository, SubmissionRepository } from '../repositories/assignment.repository';
import { CourseRepository } from '../repositories/course.repository';
import { UserRepository } from '../repositories/user.repository';
import { AssignmentMapper } from '../mappers/assignment.mapper';
import {
  IAssignmentResponseDTO,
  IAssignmentCardDTO,
  ISubmissionResponseDTO,
  ISubmissionDetailDTO,
  ICreateAssignmentDTO,
  IUpdateAssignmentDTO,
  ICreateSubmissionDTO,
  IUpdateSubmissionDTO,
  IGradeSubmissionDTO,
} from '../dtos/assignment.dto';
import { IApiResponseDTO } from '../dtos/base.dto';

export interface IAssignmentService {
  createAssignment(dto: ICreateAssignmentDTO): Promise<IApiResponseDTO<IAssignmentResponseDTO>>;
  updateAssignment(assignmentId: string, dto: IUpdateAssignmentDTO): Promise<IApiResponseDTO<IAssignmentResponseDTO>>;
  deleteAssignment(assignmentId: string): Promise<IApiResponseDTO<boolean>>;
  getAssignment(assignmentId: string): Promise<IApiResponseDTO<IAssignmentResponseDTO>>;
  getCourseAssignments(courseId: string): Promise<IApiResponseDTO<IAssignmentCardDTO[]>>;
  getStudentAssignments(studentId: string, courseIds: string[]): Promise<IApiResponseDTO<IAssignmentCardDTO[]>>;
  publishAssignment(assignmentId: string): Promise<IApiResponseDTO<IAssignmentResponseDTO>>;
  
  // Submission methods
  submitAssignment(dto: ICreateSubmissionDTO, studentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO>>;
  updateSubmission(submissionId: string, dto: IUpdateSubmissionDTO): Promise<IApiResponseDTO<ISubmissionResponseDTO>>;
  getSubmission(submissionId: string): Promise<IApiResponseDTO<ISubmissionDetailDTO>>;
  getStudentSubmission(assignmentId: string, studentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO | null>>;
  getAssignmentSubmissions(assignmentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO[]>>;
  gradeSubmission(submissionId: string, dto: IGradeSubmissionDTO, graderId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO>>;
  getPendingGrading(teacherId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO[]>>;
}

export class AssignmentService implements IAssignmentService {

  constructor(
    private assignmentRepository: AssignmentRepository,
    private submissionRepository: SubmissionRepository,
    private courseRepository: CourseRepository,
    private userRepository: UserRepository,
    private assignmentMapper: AssignmentMapper
  ) {}

  async createAssignment(dto: ICreateAssignmentDTO): Promise<IApiResponseDTO<IAssignmentResponseDTO>> {
    try {
      const course = await this.courseRepository.findById(dto.courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const assignment = this.assignmentMapper.toEntity(dto);
      await this.assignmentRepository.create(assignment);

      return {
        success: true,
        data: this.assignmentMapper.toResponseDTO(assignment, course.title),
        message: 'Assignment created successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAssignment(assignmentId: string, dto: IUpdateAssignmentDTO): Promise<IApiResponseDTO<IAssignmentResponseDTO>> {
    try {
      const assignment = await this.assignmentRepository.findById(assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      this.assignmentMapper.updateEntity(assignment, dto);
      await this.assignmentRepository.update(assignment);

      return {
        success: true,
        data: this.assignmentMapper.toResponseDTO(assignment),
        message: 'Assignment updated successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAssignment(assignmentId: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const deleted = await this.assignmentRepository.delete(assignmentId);
      return {
        success: true,
        data: deleted,
        message: deleted ? 'Assignment deleted' : 'Assignment not found',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAssignment(assignmentId: string): Promise<IApiResponseDTO<IAssignmentResponseDTO>> {
    try {
      const assignment = await this.assignmentRepository.findById(assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      const course = await this.courseRepository.findById(assignment.courseId);
      return {
        success: true,
        data: this.assignmentMapper.toResponseDTO(assignment, course?.title),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCourseAssignments(courseId: string): Promise<IApiResponseDTO<IAssignmentCardDTO[]>> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const assignments = await this.assignmentRepository.findByCourse(courseId);
      const cards = assignments.map(a => this.assignmentMapper.toCardDTO(a, course.title));

      return { success: true, data: cards };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getStudentAssignments(studentId: string, courseIds: string[]): Promise<IApiResponseDTO<IAssignmentCardDTO[]>> {
    try {
      const allAssignments: IAssignmentCardDTO[] = [];

      for (const courseId of courseIds) {
        const course = await this.courseRepository.findById(courseId);
        if (!course) continue;

        const assignments = await this.assignmentRepository.findPublishedByCourse(courseId);
        
        for (const assignment of assignments) {
          const submission = await this.submissionRepository.findByAssignmentAndStudent(
            assignment.id,
            studentId
          );

          allAssignments.push(
            this.assignmentMapper.toCardDTO(
              assignment,
              course.title,
              submission?.status,
              submission?.grade
            )
          );
        }
      }

      // Sort by due date
      allAssignments.sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

      return { success: true, data: allAssignments };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async publishAssignment(assignmentId: string): Promise<IApiResponseDTO<IAssignmentResponseDTO>> {
    try {
      const assignment = await this.assignmentRepository.findById(assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      assignment.publish();
      await this.assignmentRepository.update(assignment);

      return {
        success: true,
        data: this.assignmentMapper.toResponseDTO(assignment),
        message: 'Assignment published successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async submitAssignment(dto: ICreateSubmissionDTO, studentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO>> {
    try {
      const assignment = await this.assignmentRepository.findById(dto.assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      if (assignment.status !== 'published') {
        return { success: false, error: 'Assignment is not accepting submissions' };
      }

      // Check for existing submission
      const existing = await this.submissionRepository.findByAssignmentAndStudent(
        dto.assignmentId,
        studentId
      );
      if (existing && existing.status === 'graded') {
        return { success: false, error: 'Assignment already graded' };
      }

      // Check if late
      const isLate = assignment.isOverdue();
      if (isLate && !assignment.allowLateSubmission) {
        return { success: false, error: 'Late submissions are not allowed' };
      }

      let submission: SubmissionEntity;
      
      if (existing) {
        // Update existing submission
        existing.content = dto.content;
        existing.attachments = dto.attachments ?? existing.attachments;
        existing.submit();
        if (isLate) existing.markAsLate();
        await this.submissionRepository.update(existing);
        submission = existing;
      } else {
        // Create new submission
        submission = this.assignmentMapper.toSubmissionEntity(dto, studentId);
        submission.submit();
        if (isLate) submission.markAsLate();
        await this.submissionRepository.create(submission);
      }

      const student = await this.userRepository.findById(studentId);

      return {
        success: true,
        data: this.assignmentMapper.toSubmissionResponseDTO(
          submission,
          assignment.title,
          student?.fullName
        ),
        message: isLate ? 'Late submission recorded' : 'Assignment submitted successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateSubmission(submissionId: string, dto: IUpdateSubmissionDTO): Promise<IApiResponseDTO<ISubmissionResponseDTO>> {
    try {
      const submission = await this.submissionRepository.findById(submissionId);
      if (!submission) {
        return { success: false, error: 'Submission not found' };
      }

      if (submission.status === 'graded') {
        return { success: false, error: 'Cannot update graded submission' };
      }

      if (dto.content !== undefined) submission.content = dto.content;
      if (dto.attachments !== undefined) submission.attachments = dto.attachments;
      submission.touch();

      await this.submissionRepository.update(submission);

      return {
        success: true,
        data: this.assignmentMapper.toSubmissionResponseDTO(submission),
        message: 'Submission updated',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSubmission(submissionId: string): Promise<IApiResponseDTO<ISubmissionDetailDTO>> {
    try {
      const submission = await this.submissionRepository.findById(submissionId);
      if (!submission) {
        return { success: false, error: 'Submission not found' };
      }

      const assignment = await this.assignmentRepository.findById(submission.assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      return {
        success: true,
        data: this.assignmentMapper.toSubmissionDetailDTO(submission, assignment),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getStudentSubmission(assignmentId: string, studentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO | null>> {
    try {
      const submission = await this.submissionRepository.findByAssignmentAndStudent(
        assignmentId,
        studentId
      );

      if (!submission) {
        return { success: true, data: null };
      }

      const assignment = await this.assignmentRepository.findById(assignmentId);
      const student = await this.userRepository.findById(studentId);

      return {
        success: true,
        data: this.assignmentMapper.toSubmissionResponseDTO(
          submission,
          assignment?.title,
          student?.fullName
        ),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAssignmentSubmissions(assignmentId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO[]>> {
    try {
      const assignment = await this.assignmentRepository.findById(assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      const submissions = await this.submissionRepository.findByAssignment(assignmentId);
      
      const dtos = await Promise.all(
        submissions.map(async (s) => {
          const student = await this.userRepository.findById(s.studentId);
          return this.assignmentMapper.toSubmissionResponseDTO(
            s,
            assignment.title,
            student?.fullName
          );
        })
      );

      return { success: true, data: dtos };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async gradeSubmission(
    submissionId: string,
    dto: IGradeSubmissionDTO,
    graderId: string
  ): Promise<IApiResponseDTO<ISubmissionResponseDTO>> {
    try {
      const submission = await this.submissionRepository.findById(submissionId);
      if (!submission) {
        return { success: false, error: 'Submission not found' };
      }

      const assignment = await this.assignmentRepository.findById(submission.assignmentId);
      if (!assignment) {
        return { success: false, error: 'Assignment not found' };
      }

      // Apply late penalty if applicable
      let finalGrade = dto.grade;
      if (submission.status === 'late' && assignment.latePenalty > 0) {
        const penalty = (dto.grade * assignment.latePenalty) / 100;
        finalGrade = Math.max(0, dto.grade - penalty);
      }

      submission.setGrade(finalGrade, dto.feedback, graderId);
      await this.submissionRepository.update(submission);

      const student = await this.userRepository.findById(submission.studentId);

      return {
        success: true,
        data: this.assignmentMapper.toSubmissionResponseDTO(
          submission,
          assignment.title,
          student?.fullName
        ),
        message: 'Submission graded successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPendingGrading(teacherId: string): Promise<IApiResponseDTO<ISubmissionResponseDTO[]>> {
    try {
      // Get teacher's courses
      const courses = await this.courseRepository.findByTeacher(teacherId);
      const courseIds = courses.map(c => c.id);

      // Get assignments for those courses
      const allSubmissions: ISubmissionResponseDTO[] = [];

      for (const courseId of courseIds) {
        const assignments = await this.assignmentRepository.findByCourse(courseId);
        const course = courses.find(c => c.id === courseId);

        for (const assignment of assignments) {
          const submissions = await this.submissionRepository.findByAssignment(assignment.id);
          const pending = submissions.filter(s => 
            s.status === 'submitted' || s.status === 'late'
          );

          for (const submission of pending) {
            const student = await this.userRepository.findById(submission.studentId);
            allSubmissions.push(
              this.assignmentMapper.toSubmissionResponseDTO(
                submission,
                `${course?.title} - ${assignment.title}`,
                student?.fullName
              )
            );
          }
        }
      }

      return { success: true, data: allSubmissions };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: unknown): IApiResponseDTO<T> {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.error('AssignmentService error:', error);
    return { success: false, error: message };
  }
}
