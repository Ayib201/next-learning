'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { useAssignmentService } from './use-services';
import {
  IAssignmentResponseDTO,
  IAssignmentCardDTO,
  ISubmissionResponseDTO,
  ICreateAssignmentDTO,
  IUpdateAssignmentDTO,
  ICreateSubmissionDTO,
  IGradeSubmissionDTO,
} from '@/core/dtos/assignment.dto';

// Hook for fetching course assignments
export function useCourseAssignments(courseId: string) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    courseId ? ['course-assignments', courseId] : null,
    async () => {
      const result = await assignmentService.getCourseAssignments(courseId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    assignments: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching student's assignments across courses
export function useStudentAssignments(studentId: string, courseIds: string[]) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    studentId && courseIds.length > 0 ? ['student-assignments', studentId, courseIds.join(',')] : null,
    async () => {
      const result = await assignmentService.getStudentAssignments(studentId, courseIds);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    assignments: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching a single assignment
export function useAssignment(assignmentId: string) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    assignmentId ? ['assignment', assignmentId] : null,
    async () => {
      const result = await assignmentService.getAssignment(assignmentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    assignment: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching student's submission for an assignment
export function useStudentSubmission(assignmentId: string, studentId: string) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    assignmentId && studentId ? ['submission', assignmentId, studentId] : null,
    async () => {
      const result = await assignmentService.getStudentSubmission(assignmentId, studentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    submission: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching all submissions for an assignment (teachers)
export function useAssignmentSubmissions(assignmentId: string) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    assignmentId ? ['assignment-submissions', assignmentId] : null,
    async () => {
      const result = await assignmentService.getAssignmentSubmissions(assignmentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    submissions: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching pending grading (teachers)
export function usePendingGrading(teacherId: string) {
  const assignmentService = useAssignmentService();

  const { data, error, isLoading, mutate } = useSWR(
    teacherId ? ['pending-grading', teacherId] : null,
    async () => {
      const result = await assignmentService.getPendingGrading(teacherId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    pendingSubmissions: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for submitting assignments (students)
export function useAssignmentSubmission() {
  const assignmentService = useAssignmentService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAssignment = useCallback(async (dto: ICreateSubmissionDTO, studentId: string) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.submitAssignment(dto, studentId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  return {
    submitAssignment,
    isSubmitting,
  };
}

// Hook for assignment management (teachers)
export function useAssignmentManagement() {
  const assignmentService = useAssignmentService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createAssignment = useCallback(async (dto: ICreateAssignmentDTO) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.createAssignment(dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  const updateAssignment = useCallback(async (assignmentId: string, dto: IUpdateAssignmentDTO) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.updateAssignment(assignmentId, dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  const deleteAssignment = useCallback(async (assignmentId: string) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.deleteAssignment(assignmentId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  const publishAssignment = useCallback(async (assignmentId: string) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.publishAssignment(assignmentId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  return {
    createAssignment,
    updateAssignment,
    deleteAssignment,
    publishAssignment,
    isSubmitting,
  };
}

// Hook for grading submissions (teachers)
export function useGrading() {
  const assignmentService = useAssignmentService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gradeSubmission = useCallback(async (
    submissionId: string, 
    dto: IGradeSubmissionDTO, 
    graderId: string
  ) => {
    setIsSubmitting(true);
    try {
      const result = await assignmentService.gradeSubmission(submissionId, dto, graderId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [assignmentService]);

  return {
    gradeSubmission,
    isSubmitting,
  };
}
