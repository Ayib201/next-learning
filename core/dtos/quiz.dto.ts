import { IBaseDTO, IFilterDTO } from './base.dto';
import { QuestionType, IQuizQuestion, IQuizOption } from '../entities/quiz.entity';
import { QuizAttemptStatus } from '../entities/quiz-attempt.entity';

// Response DTOs
export interface IQuizResponseDTO extends IBaseDTO {
  courseId: string;
  courseName?: string;
  lessonId?: string;
  title: string;
  description: string;
  questionCount: number;
  totalPoints: number;
  duration: number;
  passingScore: number;
  maxAttempts: number;
  isPublished: boolean;
}

export interface IQuizDetailDTO extends IQuizResponseDTO {
  questions: IQuizQuestionDTO[];
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: boolean;
}

export interface IQuizQuestionDTO {
  id: string;
  question: string;
  type: QuestionType;
  options: IQuizOptionDTO[];
  points: number;
  // Note: correctAnswer and isCorrect are NOT sent to students during quiz
}

export interface IQuizOptionDTO {
  id: string;
  text: string;
  // isCorrect is NOT sent to students during quiz
}

// For teachers - includes correct answers
export interface IQuizQuestionEditDTO extends IQuizQuestionDTO {
  options: IQuizOptionEditDTO[];
  correctAnswer?: string;
  explanation?: string;
}

export interface IQuizOptionEditDTO extends IQuizOptionDTO {
  isCorrect: boolean;
}

// Quiz Attempt DTOs
export interface IQuizAttemptResponseDTO extends IBaseDTO {
  quizId: string;
  quizTitle: string;
  studentId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
  timeSpent: number;
  status: QuizAttemptStatus;
  attemptNumber: number;
}

export interface IQuizAttemptDetailDTO extends IQuizAttemptResponseDTO {
  answers: IQuizAnswerDTO[];
}

export interface IQuizAnswerDTO {
  questionId: string;
  question: string;
  selectedOptions: string[];
  textAnswer?: string;
  isCorrect: boolean;
  pointsEarned: number;
  correctAnswer?: string[];
  explanation?: string;
}

// Request DTOs
export interface ICreateQuizDTO {
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  duration?: number;
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showCorrectAnswers?: boolean;
}

export interface IUpdateQuizDTO {
  title?: string;
  description?: string;
  duration?: number;
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showCorrectAnswers?: boolean;
  isPublished?: boolean;
}

export interface ICreateQuestionDTO {
  question: string;
  type: QuestionType;
  options: IQuizOption[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
}

export interface ISubmitQuizDTO {
  answers: ISubmitAnswerDTO[];
}

export interface ISubmitAnswerDTO {
  questionId: string;
  selectedOptions: string[];
  textAnswer?: string;
}

// Filter DTOs
export interface IQuizFilterDTO extends IFilterDTO {
  courseId?: string;
  isPublished?: boolean;
}

export interface IQuizAttemptFilterDTO extends IFilterDTO {
  quizId?: string;
  studentId?: string;
  status?: QuizAttemptStatus;
  passed?: boolean;
}
