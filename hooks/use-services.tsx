'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { bootstrapContainer, getService } from '@/core/di/bootstrap';
import { ServiceKeys } from '@/core/di/container';
import { AuthService } from '@/core/services/auth.service';
import { UserService } from '@/core/services/user.service';
import { CourseService } from '@/core/services/course.service';
import { EnrollmentService } from '@/core/services/enrollment.service';
import { QuizService } from '@/core/services/quiz.service';
import { AssignmentService } from '@/core/services/assignment.service';

interface ServiceContextType {
  isReady: boolean;
  authService: AuthService;
  userService: UserService;
  courseService: CourseService;
  enrollmentService: EnrollmentService;
  quizService: QuizService;
  assignmentService: AssignmentService;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

interface ServiceProviderProps {
  children: ReactNode;
}

export function ServiceProvider({ children }: ServiceProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [services, setServices] = useState<ServiceContextType | null>(null);

  useEffect(() => {
    // Bootstrap the container on mount
    bootstrapContainer();

    // Get all services
    const authService = getService<AuthService>(ServiceKeys.AuthService);
    const userService = getService<UserService>(ServiceKeys.UserService);
    const courseService = getService<CourseService>(ServiceKeys.CourseService);
    const enrollmentService = getService<EnrollmentService>(ServiceKeys.EnrollmentService);
    const quizService = getService<QuizService>(ServiceKeys.QuizService);
    const assignmentService = getService<AssignmentService>(ServiceKeys.AssignmentService);

    setServices({
      isReady: true,
      authService,
      userService,
      courseService,
      enrollmentService,
      quizService,
      assignmentService,
    });
    setIsReady(true);
  }, []);

  if (!isReady || !services) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

// Hook to access all services
export function useServices(): ServiceContextType {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}

// Individual service hooks for convenience
export function useAuthService(): AuthService {
  const { authService } = useServices();
  return authService;
}

export function useUserService(): UserService {
  const { userService } = useServices();
  return userService;
}

export function useCourseService(): CourseService {
  const { courseService } = useServices();
  return courseService;
}

export function useEnrollmentService(): EnrollmentService {
  const { enrollmentService } = useServices();
  return enrollmentService;
}

export function useQuizService(): QuizService {
  const { quizService } = useServices();
  return quizService;
}

export function useAssignmentService(): AssignmentService {
  const { assignmentService } = useServices();
  return assignmentService;
}
