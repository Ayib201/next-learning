'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import { useCourseService, useEnrollmentService } from './use-services';
import { ICourseCardDTO, ICourseDetailDTO, ICourseFilterDTO, ICreateCourseDTO, IUpdateCourseDTO } from '@/core/dtos/course.dto';

// Hook for fetching all courses
export function useCourses(filter?: ICourseFilterDTO) {
  const courseService = useCourseService();

  const { data, error, isLoading, mutate } = useSWR(
    ['courses', filter],
    async () => {
      const result = await courseService.getCourseCards(filter);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching popular courses
export function usePopularCourses(limit: number = 6) {
  const courseService = useCourseService();

  const { data, error, isLoading } = useSWR(
    ['popular-courses', limit],
    async () => {
      const result = await courseService.getPopularCourses(limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    error: error?.message,
  };
}

// Hook for fetching a single course detail
export function useCourseDetail(courseId: string) {
  const courseService = useCourseService();

  const { data, error, isLoading, mutate } = useSWR(
    courseId ? ['course', courseId] : null,
    async () => {
      const result = await courseService.getCourseDetail(courseId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    course: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for fetching teacher's courses
export function useTeacherCourses(teacherId: string) {
  const courseService = useCourseService();

  const { data, error, isLoading, mutate } = useSWR(
    teacherId ? ['teacher-courses', teacherId] : null,
    async () => {
      const result = await courseService.getTeacherCourses(teacherId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for course management (create, update, delete)
export function useCourseManagement() {
  const courseService = useCourseService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCourse = useCallback(async (dto: ICreateCourseDTO, teacherId: string) => {
    setIsSubmitting(true);
    try {
      const result = await courseService.createCourse(dto, teacherId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [courseService]);

  const updateCourse = useCallback(async (courseId: string, dto: IUpdateCourseDTO) => {
    setIsSubmitting(true);
    try {
      const result = await courseService.update(courseId, dto);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [courseService]);

  const publishCourse = useCallback(async (courseId: string) => {
    setIsSubmitting(true);
    try {
      const result = await courseService.publishCourse(courseId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [courseService]);

  const archiveCourse = useCallback(async (courseId: string) => {
    setIsSubmitting(true);
    try {
      const result = await courseService.archiveCourse(courseId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [courseService]);

  return {
    createCourse,
    updateCourse,
    publishCourse,
    archiveCourse,
    isSubmitting,
  };
}

// Hook for student enrollment
export function useEnrollment() {
  const enrollmentService = useEnrollmentService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enroll = useCallback(async (studentId: string, courseId: string) => {
    setIsSubmitting(true);
    try {
      const result = await enrollmentService.enrollStudent(studentId, courseId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [enrollmentService]);

  const unenroll = useCallback(async (studentId: string, courseId: string) => {
    setIsSubmitting(true);
    try {
      const result = await enrollmentService.unenrollStudent(studentId, courseId);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [enrollmentService]);

  const checkEnrollment = useCallback(async (studentId: string, courseId: string) => {
    return enrollmentService.isEnrolled(studentId, courseId);
  }, [enrollmentService]);

  return {
    enroll,
    unenroll,
    checkEnrollment,
    isSubmitting,
  };
}

// Hook for student's enrolled courses
export function useStudentCourses(studentId: string) {
  const enrollmentService = useEnrollmentService();

  const { data, error, isLoading, mutate } = useSWR(
    studentId ? ['student-courses', studentId] : null,
    async () => {
      const result = await enrollmentService.getStudentCourses(studentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}

// Hook for student progress
export function useStudentProgress(studentId: string) {
  const enrollmentService = useEnrollmentService();

  const { data, error, isLoading, mutate } = useSWR(
    studentId ? ['student-progress', studentId] : null,
    async () => {
      const result = await enrollmentService.getStudentProgress(studentId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    }
  );

  return {
    progress: data,
    isLoading,
    error: error?.message,
    refresh: mutate,
  };
}
