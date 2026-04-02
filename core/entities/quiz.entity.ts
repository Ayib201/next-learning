import { BaseEntity, IBaseEntity } from './base.entity';

export type QuestionType = 'single' | 'multiple' | 'true_false' | 'short_answer';

export interface IQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: IQuizOption[];
  correctAnswer?: string; // for short_answer
  points: number;
  explanation?: string;
}

export interface IQuiz extends IBaseEntity {
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  questions: IQuizQuestion[];
  duration: number; // in minutes, 0 = unlimited
  passingScore: number; // percentage
  maxAttempts: number; // 0 = unlimited
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: boolean;
  isPublished: boolean;
}

export class QuizEntity extends BaseEntity implements IQuiz {
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  questions: IQuizQuestion[];
  duration: number;
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showCorrectAnswers: boolean;
  isPublished: boolean;

  constructor(data: Partial<IQuiz>) {
    super(data);
    this.courseId = data.courseId ?? '';
    this.lessonId = data.lessonId;
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.questions = data.questions ?? [];
    this.duration = data.duration ?? 0;
    this.passingScore = data.passingScore ?? 60;
    this.maxAttempts = data.maxAttempts ?? 0;
    this.shuffleQuestions = data.shuffleQuestions ?? false;
    this.shuffleOptions = data.shuffleOptions ?? false;
    this.showCorrectAnswers = data.showCorrectAnswers ?? true;
    this.isPublished = data.isPublished ?? false;
  }

  get totalPoints(): number {
    return this.questions.reduce((sum, q) => sum + q.points, 0);
  }

  get questionCount(): number {
    return this.questions.length;
  }

  addQuestion(question: IQuizQuestion): void {
    this.questions.push(question);
    this.touch();
  }

  removeQuestion(questionId: string): void {
    this.questions = this.questions.filter(q => q.id !== questionId);
    this.touch();
  }

  updateQuestion(questionId: string, data: Partial<IQuizQuestion>): void {
    const index = this.questions.findIndex(q => q.id === questionId);
    if (index !== -1) {
      this.questions[index] = { ...this.questions[index], ...data };
      this.touch();
    }
  }

  publish(): void {
    this.isPublished = true;
    this.touch();
  }
}
