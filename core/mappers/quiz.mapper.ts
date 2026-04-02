import { BaseMapper } from './base.mapper';
import { QuizEntity, IQuiz, IQuizQuestion, IQuizOption } from '../entities/quiz.entity';
import { QuizAttemptEntity, IQuizAttempt, IQuizAnswer } from '../entities/quiz-attempt.entity';
import {
  IQuizResponseDTO,
  IQuizDetailDTO,
  IQuizQuestionDTO,
  IQuizOptionDTO,
  IQuizQuestionEditDTO,
  IQuizAttemptResponseDTO,
  IQuizAttemptDetailDTO,
  IQuizAnswerDTO,
  ICreateQuizDTO,
  IUpdateQuizDTO,
} from '../dtos/quiz.dto';

export class QuizMapper extends BaseMapper<QuizEntity, IQuizResponseDTO, ICreateQuizDTO, IUpdateQuizDTO> {

  toResponseDTO(entity: QuizEntity, courseName?: string): IQuizResponseDTO {
    return {
      id: entity.id,
      courseId: entity.courseId,
      courseName,
      lessonId: entity.lessonId,
      title: entity.title,
      description: entity.description,
      questionCount: entity.questionCount,
      totalPoints: entity.totalPoints,
      duration: entity.duration,
      passingScore: entity.passingScore,
      maxAttempts: entity.maxAttempts,
      isPublished: entity.isPublished,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  // For students - hide correct answers
  toDetailDTO(entity: QuizEntity): IQuizDetailDTO {
    return {
      ...this.toResponseDTO(entity),
      questions: entity.questions.map(q => this.toQuestionDTO(q)),
      shuffleQuestions: entity.shuffleQuestions,
      shuffleOptions: entity.shuffleOptions,
      showCorrectAnswers: entity.showCorrectAnswers,
    };
  }

  // For students - hide correct answers
  toQuestionDTO(question: IQuizQuestion): IQuizQuestionDTO {
    return {
      id: question.id,
      question: question.question,
      type: question.type,
      options: question.options.map(o => this.toOptionDTO(o)),
      points: question.points,
    };
  }

  toOptionDTO(option: IQuizOption): IQuizOptionDTO {
    return {
      id: option.id,
      text: option.text,
    };
  }

  // For teachers - include correct answers
  toQuestionEditDTO(question: IQuizQuestion): IQuizQuestionEditDTO {
    return {
      ...this.toQuestionDTO(question),
      options: question.options.map(o => ({
        ...this.toOptionDTO(o),
        isCorrect: o.isCorrect,
      })),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    };
  }

  toEntity(dto: ICreateQuizDTO): QuizEntity {
    return new QuizEntity({
      courseId: dto.courseId,
      lessonId: dto.lessonId,
      title: dto.title,
      description: dto.description,
      duration: dto.duration ?? 0,
      passingScore: dto.passingScore ?? 60,
      maxAttempts: dto.maxAttempts ?? 0,
      shuffleQuestions: dto.shuffleQuestions ?? false,
      shuffleOptions: dto.shuffleOptions ?? false,
      showCorrectAnswers: dto.showCorrectAnswers ?? true,
    });
  }

  updateEntity(entity: QuizEntity, dto: IUpdateQuizDTO): QuizEntity {
    if (dto.title !== undefined) entity.title = dto.title;
    if (dto.description !== undefined) entity.description = dto.description;
    if (dto.duration !== undefined) entity.duration = dto.duration;
    if (dto.passingScore !== undefined) entity.passingScore = dto.passingScore;
    if (dto.maxAttempts !== undefined) entity.maxAttempts = dto.maxAttempts;
    if (dto.shuffleQuestions !== undefined) entity.shuffleQuestions = dto.shuffleQuestions;
    if (dto.shuffleOptions !== undefined) entity.shuffleOptions = dto.shuffleOptions;
    if (dto.showCorrectAnswers !== undefined) entity.showCorrectAnswers = dto.showCorrectAnswers;
    if (dto.isPublished !== undefined) entity.isPublished = dto.isPublished;
    entity.touch();
    return entity;
  }

  // Quiz Attempt Mappers
  toAttemptResponseDTO(entity: QuizAttemptEntity, quizTitle?: string): IQuizAttemptResponseDTO {
    return {
      id: entity.id,
      quizId: entity.quizId,
      quizTitle: quizTitle ?? '',
      studentId: entity.studentId,
      score: entity.score,
      totalPoints: entity.totalPoints,
      percentage: entity.percentage,
      passed: entity.passed,
      startedAt: entity.startedAt.toISOString(),
      completedAt: entity.completedAt?.toISOString(),
      timeSpent: entity.timeSpent,
      status: entity.status,
      attemptNumber: entity.attemptNumber,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toAttemptDetailDTO(
    entity: QuizAttemptEntity,
    quiz: QuizEntity,
    showCorrectAnswers: boolean
  ): IQuizAttemptDetailDTO {
    return {
      ...this.toAttemptResponseDTO(entity, quiz.title),
      answers: entity.answers.map(a => this.toAnswerDTO(a, quiz, showCorrectAnswers)),
    };
  }

  toAnswerDTO(answer: IQuizAnswer, quiz: QuizEntity, showCorrect: boolean): IQuizAnswerDTO {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    return {
      questionId: answer.questionId,
      question: question?.question ?? '',
      selectedOptions: answer.selectedOptions,
      textAnswer: answer.textAnswer,
      isCorrect: answer.isCorrect,
      pointsEarned: answer.pointsEarned,
      correctAnswer: showCorrect 
        ? question?.options.filter(o => o.isCorrect).map(o => o.id) 
        : undefined,
      explanation: showCorrect ? question?.explanation : undefined,
    };
  }

  fromRaw(data: IQuiz): QuizEntity {
    return new QuizEntity(data);
  }

  attemptFromRaw(data: IQuizAttempt): QuizAttemptEntity {
    return new QuizAttemptEntity(data);
  }
}

export const quizMapper = new QuizMapper();
