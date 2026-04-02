import { BaseEntity, IBaseEntity } from './base.entity';

export interface IQuizAnswer {
  questionId: string;
  selectedOptions: string[];
  textAnswer?: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export type QuizAttemptStatus = 'in_progress' | 'completed' | 'timed_out';

export interface IQuizAttempt extends IBaseEntity {
  quizId: string;
  studentId: string;
  answers: IQuizAnswer[];
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  completedAt?: Date;
  timeSpent: number; // in seconds
  status: QuizAttemptStatus;
  attemptNumber: number;
}

export class QuizAttemptEntity extends BaseEntity implements IQuizAttempt {
  quizId: string;
  studentId: string;
  answers: IQuizAnswer[];
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  completedAt?: Date;
  timeSpent: number;
  status: QuizAttemptStatus;
  attemptNumber: number;

  constructor(data: Partial<IQuizAttempt>) {
    super(data);
    this.quizId = data.quizId ?? '';
    this.studentId = data.studentId ?? '';
    this.answers = data.answers ?? [];
    this.score = data.score ?? 0;
    this.totalPoints = data.totalPoints ?? 0;
    this.percentage = data.percentage ?? 0;
    this.passed = data.passed ?? false;
    this.startedAt = data.startedAt ?? new Date();
    this.completedAt = data.completedAt;
    this.timeSpent = data.timeSpent ?? 0;
    this.status = data.status ?? 'in_progress';
    this.attemptNumber = data.attemptNumber ?? 1;
  }

  submitAnswer(answer: IQuizAnswer): void {
    const existingIndex = this.answers.findIndex(a => a.questionId === answer.questionId);
    if (existingIndex !== -1) {
      this.answers[existingIndex] = answer;
    } else {
      this.answers.push(answer);
    }
    this.touch();
  }

  complete(passingScore: number): void {
    this.score = this.answers.reduce((sum, a) => sum + a.pointsEarned, 0);
    this.percentage = this.totalPoints > 0 
      ? Math.round((this.score / this.totalPoints) * 100) 
      : 0;
    this.passed = this.percentage >= passingScore;
    this.completedAt = new Date();
    this.timeSpent = Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000);
    this.status = 'completed';
    this.touch();
  }

  timeout(): void {
    this.status = 'timed_out';
    this.completedAt = new Date();
    this.timeSpent = Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000);
    this.touch();
  }

  isInProgress(): boolean {
    return this.status === 'in_progress';
  }
}
