import { container, ServiceKeys } from './container';

// Repositories
import { userRepository, UserRepository } from '../repositories/user.repository';
import { courseRepository, CourseRepository } from '../repositories/course.repository';
import { lessonRepository, LessonRepository } from '../repositories/lesson.repository';
import { quizRepository, quizAttemptRepository, QuizRepository, QuizAttemptRepository } from '../repositories/quiz.repository';
import { assignmentRepository, submissionRepository, AssignmentRepository, SubmissionRepository } from '../repositories/assignment.repository';
import { enrollmentRepository, EnrollmentRepository } from '../repositories/enrollment.repository';

// Mappers
import { userMapper, UserMapper } from '../mappers/user.mapper';
import { courseMapper, CourseMapper } from '../mappers/course.mapper';
import { quizMapper, QuizMapper } from '../mappers/quiz.mapper';
import { assignmentMapper, AssignmentMapper } from '../mappers/assignment.mapper';
import { enrollmentMapper, EnrollmentMapper } from '../mappers/enrollment.mapper';

// Services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { QuizService } from '../services/quiz.service';
import { AssignmentService } from '../services/assignment.service';

// Seed data
import { seedDemoData } from './seed-data';

let isBootstrapped = false;

export function bootstrapContainer(): void {
  if (isBootstrapped) return;

  // Register Repositories (singleton instances)
  container.registerInstance(ServiceKeys.UserRepository, userRepository);
  container.registerInstance(ServiceKeys.CourseRepository, courseRepository);
  container.registerInstance(ServiceKeys.LessonRepository, lessonRepository);
  container.registerInstance(ServiceKeys.QuizRepository, quizRepository);
  container.registerInstance(ServiceKeys.QuizAttemptRepository, quizAttemptRepository);
  container.registerInstance(ServiceKeys.AssignmentRepository, assignmentRepository);
  container.registerInstance(ServiceKeys.SubmissionRepository, submissionRepository);
  container.registerInstance(ServiceKeys.EnrollmentRepository, enrollmentRepository);

  // Register Mappers (singleton instances)
  container.registerInstance(ServiceKeys.UserMapper, userMapper);
  container.registerInstance(ServiceKeys.CourseMapper, courseMapper);
  container.registerInstance(ServiceKeys.QuizMapper, quizMapper);
  container.registerInstance(ServiceKeys.AssignmentMapper, assignmentMapper);
  container.registerInstance(ServiceKeys.EnrollmentMapper, enrollmentMapper);

  // Register Services with factory functions
  container.register(ServiceKeys.AuthService, () => {
    return new AuthService(
      container.resolve<UserRepository>(ServiceKeys.UserRepository),
      container.resolve<UserMapper>(ServiceKeys.UserMapper)
    );
  });

  container.register(ServiceKeys.UserService, () => {
    return new UserService(
      container.resolve<UserRepository>(ServiceKeys.UserRepository),
      container.resolve<UserMapper>(ServiceKeys.UserMapper)
    );
  });

  container.register(ServiceKeys.CourseService, () => {
    return new CourseService(
      container.resolve<CourseRepository>(ServiceKeys.CourseRepository),
      container.resolve<LessonRepository>(ServiceKeys.LessonRepository),
      container.resolve<QuizRepository>(ServiceKeys.QuizRepository),
      container.resolve<AssignmentRepository>(ServiceKeys.AssignmentRepository),
      container.resolve<UserRepository>(ServiceKeys.UserRepository),
      container.resolve<CourseMapper>(ServiceKeys.CourseMapper),
      container.resolve<UserMapper>(ServiceKeys.UserMapper)
    );
  });

  container.register(ServiceKeys.EnrollmentService, () => {
    return new EnrollmentService(
      container.resolve<EnrollmentRepository>(ServiceKeys.EnrollmentRepository),
      container.resolve<CourseRepository>(ServiceKeys.CourseRepository),
      container.resolve<LessonRepository>(ServiceKeys.LessonRepository),
      container.resolve<UserRepository>(ServiceKeys.UserRepository),
      container.resolve<EnrollmentMapper>(ServiceKeys.EnrollmentMapper),
      container.resolve<CourseMapper>(ServiceKeys.CourseMapper)
    );
  });

  container.register(ServiceKeys.QuizService, () => {
    return new QuizService(
      container.resolve<QuizRepository>(ServiceKeys.QuizRepository),
      container.resolve<QuizAttemptRepository>(ServiceKeys.QuizAttemptRepository),
      container.resolve<CourseRepository>(ServiceKeys.CourseRepository),
      container.resolve<QuizMapper>(ServiceKeys.QuizMapper)
    );
  });

  container.register(ServiceKeys.AssignmentService, () => {
    return new AssignmentService(
      container.resolve<AssignmentRepository>(ServiceKeys.AssignmentRepository),
      container.resolve<SubmissionRepository>(ServiceKeys.SubmissionRepository),
      container.resolve<CourseRepository>(ServiceKeys.CourseRepository),
      container.resolve<UserRepository>(ServiceKeys.UserRepository),
      container.resolve<AssignmentMapper>(ServiceKeys.AssignmentMapper)
    );
  });

  isBootstrapped = true;
  
  // Seed demo data
  seedDemoData();
}

// Helper function to reset container (useful for testing)
export function resetContainer(): void {
  container.clear();
  isBootstrapped = false;
}

// Export a function to get services easily
export function getService<T>(key: string): T {
  if (!isBootstrapped) {
    bootstrapContainer();
  }
  return container.resolve<T>(key);
}
