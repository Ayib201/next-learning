'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { useQuizService } from './use-services';
import { 
  IQuizResponseDTO, 
  IQuizDetailDTO, 
  IQuizAttemptResponseDTO,
  ICreateQuizDTO, 
  IUpdateQuizDTO,
  ICreateQuestionDTO,
  ISubmitQuizDTO,
} from '@/core/dtos/quiz.dto';

// Hook for fetching course quizzes
export function useCourseQuizzes(courseId: string) {
  const quizService = useQuizService();

  const { data, error, isLoading, mutate } = useSWR(
    courseId ? ['course-quizzes', courseId] : null,
    async () => {
      const result = await quizService.getCourseQuizzes(courseId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    quizzes: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching quiz detail (for students)
export function useQuizDetail(quizId: string) {
  const quizService = useQuizService();

  const { data, error, isLoading, mutate } = useSWR(
    quizId ? ['quiz', quizId] : null,
    async () => {
      const result = await quizService.getQuizForStudent(quizId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    quiz: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching quiz detail (for teachers - includes answers)
export function useQuizDetailForTeacher(quizId: string) {
  const quizService = useQuizService();

  const { data, error, isLoading, mutate } = useSWR(
    quizId ? ['quiz-teacher', quizId] : null,
    async () => {
      const result = await quizService.getQuizForTeacher(quizId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    quiz: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for student's quiz attempts
export function useQuizAttempts(quizId: string, studentId: string) {
  const quizService = useQuizService();

  const { data, error, isLoading, mutate } = useSWR(
    quizId && studentId ? ['quiz-attempts', quizId, studentId] : null,
    async () => {
      const result = await quizService.getStudentAttempts(quizId, studentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    attempts: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for taking a quiz
export function useQuizAttempt() {
  const quizService = useQuizService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState<IQuizAttemptResponseDTO | null>(null);

  const startQuiz = useCallback(async (quizId: string, studentId: string) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.startAttempt(quizId, studentId);
      if (result.success && result.data) {
        setCurrentAttempt(result.data);
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  const submitQuiz = useCallback(async (attemptId: string, dto: ISubmitQuizDTO) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.submitAttempt(attemptId, dto);
      if (result.success) {
        setCurrentAttempt(null);
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  return {
    startQuiz,
    submitQuiz,
    currentAttempt,
    isSubmitting,
  };
}

// Hook for quiz management (teachers)
export function useQuizManagement() {
  const quizService = useQuizService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createQuiz = useCallback(async (dto: ICreateQuizDTO) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.createQuiz(dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  const updateQuiz = useCallback(async (quizId: string, dto: IUpdateQuizDTO) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.updateQuiz(quizId, dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  const deleteQuiz = useCallback(async (quizId: string) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.deleteQuiz(quizId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  const addQuestion = useCallback(async (quizId: string, dto: ICreateQuestionDTO) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.addQuestion(quizId, dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  const removeQuestion = useCallback(async (quizId: string, questionId: string) => {
    setIsSubmitting(true);
    try {
      const result = await quizService.removeQuestion(quizId, questionId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [quizService]);

  return {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestion,
    removeQuestion,
    isSubmitting,
  };
}
