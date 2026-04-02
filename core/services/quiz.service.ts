import { QuizEntity, IQuizQuestion } from '../entities/quiz.entity';
import { QuizAttemptEntity, IQuizAnswer } from '../entities/quiz-attempt.entity';
import { QuizRepository, QuizAttemptRepository } from '../repositories/quiz.repository';
import { CourseRepository } from '../repositories/course.repository';
import { QuizMapper } from '../mappers/quiz.mapper';
import {
  IQuizResponseDTO,
  IQuizDetailDTO,
  IQuizQuestionEditDTO,
  IQuizAttemptResponseDTO,
  IQuizAttemptDetailDTO,
  ICreateQuizDTO,
  IUpdateQuizDTO,
  ICreateQuestionDTO,
  ISubmitQuizDTO,
} from '../dtos/quiz.dto';
import { IApiResponseDTO } from '../dtos/base.dto';

export interface IQuizService {
  createQuiz(dto: ICreateQuizDTO): Promise<IApiResponseDTO<IQuizResponseDTO>>;
  updateQuiz(quizId: string, dto: IUpdateQuizDTO): Promise<IApiResponseDTO<IQuizResponseDTO>>;
  deleteQuiz(quizId: string): Promise<IApiResponseDTO<boolean>>;
  getQuizForStudent(quizId: string): Promise<IApiResponseDTO<IQuizDetailDTO>>;
  getQuizForTeacher(quizId: string): Promise<IApiResponseDTO<IQuizDetailDTO & { questions: IQuizQuestionEditDTO[] }>>;
  addQuestion(quizId: string, dto: ICreateQuestionDTO): Promise<IApiResponseDTO<IQuizResponseDTO>>;
  removeQuestion(quizId: string, questionId: string): Promise<IApiResponseDTO<IQuizResponseDTO>>;
  startAttempt(quizId: string, studentId: string): Promise<IApiResponseDTO<IQuizAttemptResponseDTO>>;
  submitAttempt(attemptId: string, dto: ISubmitQuizDTO): Promise<IApiResponseDTO<IQuizAttemptDetailDTO>>;
  getStudentAttempts(quizId: string, studentId: string): Promise<IApiResponseDTO<IQuizAttemptResponseDTO[]>>;
  getCourseQuizzes(courseId: string): Promise<IApiResponseDTO<IQuizResponseDTO[]>>;
}

export class QuizService implements IQuizService {

  constructor(
    private quizRepository: QuizRepository,
    private quizAttemptRepository: QuizAttemptRepository,
    private courseRepository: CourseRepository,
    private quizMapper: QuizMapper
  ) {}

  async createQuiz(dto: ICreateQuizDTO): Promise<IApiResponseDTO<IQuizResponseDTO>> {
    try {
      // Verify course exists
      const course = await this.courseRepository.findById(dto.courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const quiz = this.quizMapper.toEntity(dto);
      await this.quizRepository.create(quiz);

      return {
        success: true,
        data: this.quizMapper.toResponseDTO(quiz, course.title),
        message: 'Quiz created successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateQuiz(quizId: string, dto: IUpdateQuizDTO): Promise<IApiResponseDTO<IQuizResponseDTO>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      this.quizMapper.updateEntity(quiz, dto);
      await this.quizRepository.update(quiz);

      return {
        success: true,
        data: this.quizMapper.toResponseDTO(quiz),
        message: 'Quiz updated successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteQuiz(quizId: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const deleted = await this.quizRepository.delete(quizId);
      return {
        success: true,
        data: deleted,
        message: deleted ? 'Quiz deleted successfully' : 'Quiz not found',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getQuizForStudent(quizId: string): Promise<IApiResponseDTO<IQuizDetailDTO>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      if (!quiz.isPublished) {
        return { success: false, error: 'Quiz is not available' };
      }

      // Return quiz without correct answers
      const detail = this.quizMapper.toDetailDTO(quiz);
      return { success: true, data: detail };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getQuizForTeacher(quizId: string): Promise<IApiResponseDTO<IQuizDetailDTO & { questions: IQuizQuestionEditDTO[] }>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      // Return quiz with correct answers for teacher
      const detail = {
        ...this.quizMapper.toDetailDTO(quiz),
        questions: quiz.questions.map(q => this.quizMapper.toQuestionEditDTO(q)),
      };

      return { success: true, data: detail };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addQuestion(quizId: string, dto: ICreateQuestionDTO): Promise<IApiResponseDTO<IQuizResponseDTO>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      const question: IQuizQuestion = {
        id: crypto.randomUUID(),
        question: dto.question,
        type: dto.type,
        options: dto.options,
        correctAnswer: dto.correctAnswer,
        points: dto.points,
        explanation: dto.explanation,
      };

      quiz.addQuestion(question);
      await this.quizRepository.update(quiz);

      return {
        success: true,
        data: this.quizMapper.toResponseDTO(quiz),
        message: 'Question added successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async removeQuestion(quizId: string, questionId: string): Promise<IApiResponseDTO<IQuizResponseDTO>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      quiz.removeQuestion(questionId);
      await this.quizRepository.update(quiz);

      return {
        success: true,
        data: this.quizMapper.toResponseDTO(quiz),
        message: 'Question removed successfully',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async startAttempt(quizId: string, studentId: string): Promise<IApiResponseDTO<IQuizAttemptResponseDTO>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      if (!quiz.isPublished) {
        return { success: false, error: 'Quiz is not available' };
      }

      // Check attempt limit
      if (quiz.maxAttempts > 0) {
        const attemptCount = await this.quizAttemptRepository.getAttemptCount(quizId, studentId);
        if (attemptCount >= quiz.maxAttempts) {
          return { success: false, error: 'Maximum attempts reached' };
        }
      }

      // Check for in-progress attempt
      const lastAttempt = await this.quizAttemptRepository.getLastAttempt(quizId, studentId);
      if (lastAttempt?.isInProgress()) {
        return {
          success: true,
          data: this.quizMapper.toAttemptResponseDTO(lastAttempt, quiz.title),
          message: 'Resuming existing attempt',
        };
      }

      // Create new attempt
      const attemptCount = await this.quizAttemptRepository.getAttemptCount(quizId, studentId);
      const attempt = new QuizAttemptEntity({
        quizId,
        studentId,
        totalPoints: quiz.totalPoints,
        attemptNumber: attemptCount + 1,
      });

      await this.quizAttemptRepository.create(attempt);

      return {
        success: true,
        data: this.quizMapper.toAttemptResponseDTO(attempt, quiz.title),
        message: 'Quiz attempt started',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async submitAttempt(attemptId: string, dto: ISubmitQuizDTO): Promise<IApiResponseDTO<IQuizAttemptDetailDTO>> {
    try {
      const attempt = await this.quizAttemptRepository.findById(attemptId);
      if (!attempt) {
        return { success: false, error: 'Attempt not found' };
      }

      if (!attempt.isInProgress()) {
        return { success: false, error: 'Attempt already completed' };
      }

      const quiz = await this.quizRepository.findById(attempt.quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      // Grade answers
      const gradedAnswers: IQuizAnswer[] = dto.answers.map(answer => {
        const question = quiz.questions.find(q => q.id === answer.questionId);
        if (!question) {
          return {
            questionId: answer.questionId,
            selectedOptions: answer.selectedOptions,
            textAnswer: answer.textAnswer,
            isCorrect: false,
            pointsEarned: 0,
          };
        }

        let isCorrect = false;
        
        if (question.type === 'short_answer') {
          isCorrect = answer.textAnswer?.toLowerCase().trim() === 
            question.correctAnswer?.toLowerCase().trim();
        } else {
          const correctOptionIds = question.options
            .filter(o => o.isCorrect)
            .map(o => o.id)
            .sort();
          const selectedIds = answer.selectedOptions.sort();
          isCorrect = JSON.stringify(correctOptionIds) === JSON.stringify(selectedIds);
        }

        return {
          questionId: answer.questionId,
          selectedOptions: answer.selectedOptions,
          textAnswer: answer.textAnswer,
          isCorrect,
          pointsEarned: isCorrect ? question.points : 0,
        };
      });

      // Update attempt with graded answers
      attempt.answers = gradedAnswers;
      attempt.complete(quiz.passingScore);
      await this.quizAttemptRepository.update(attempt);

      const detail = this.quizMapper.toAttemptDetailDTO(attempt, quiz, quiz.showCorrectAnswers);

      return {
        success: true,
        data: detail,
        message: attempt.passed ? 'Congratulations! You passed!' : 'Quiz completed. Keep practicing!',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getStudentAttempts(quizId: string, studentId: string): Promise<IApiResponseDTO<IQuizAttemptResponseDTO[]>> {
    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        return { success: false, error: 'Quiz not found' };
      }

      const attempts = await this.quizAttemptRepository.findByQuizAndStudent(quizId, studentId);
      const dtos = attempts.map(a => this.quizMapper.toAttemptResponseDTO(a, quiz.title));

      return { success: true, data: dtos };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCourseQuizzes(courseId: string): Promise<IApiResponseDTO<IQuizResponseDTO[]>> {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { success: false, error: 'Course not found' };
      }

      const quizzes = await this.quizRepository.findByCourse(courseId);
      const dtos = quizzes.map(q => this.quizMapper.toResponseDTO(q, course.title));

      return { success: true, data: dtos };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: unknown): IApiResponseDTO<T> {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.error('QuizService error:', error);
    return { success: false, error: message };
  }
}
