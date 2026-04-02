// Simple Dependency Injection Container for React
type Constructor<T> = new (...args: unknown[]) => T;
type Factory<T> = () => T;

interface ServiceRegistration<T> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
}

class DIContainer {
  private services = new Map<string, ServiceRegistration<unknown>>();

  // Register a service with a factory function
  register<T>(key: string, factory: Factory<T>, singleton: boolean = true): void {
    this.services.set(key, { factory, singleton });
  }

  // Register a class as a service
  registerClass<T>(key: string, constructor: Constructor<T>, singleton: boolean = true): void {
    this.register(key, () => new constructor(), singleton);
  }

  // Register an existing instance
  registerInstance<T>(key: string, instance: T): void {
    this.services.set(key, { 
      factory: () => instance, 
      singleton: true, 
      instance 
    });
  }

  // Get a service instance
  resolve<T>(key: string): T {
    const registration = this.services.get(key);
    
    if (!registration) {
      throw new Error(`Service '${key}' not registered in container`);
    }

    if (registration.singleton) {
      if (!registration.instance) {
        registration.instance = registration.factory();
      }
      return registration.instance as T;
    }

    return registration.factory() as T;
  }

  // Check if a service is registered
  has(key: string): boolean {
    return this.services.has(key);
  }

  // Remove a service
  unregister(key: string): boolean {
    return this.services.delete(key);
  }

  // Clear all services (useful for testing)
  clear(): void {
    this.services.clear();
  }

  // Get all registered service keys
  getRegisteredServices(): string[] {
    return Array.from(this.services.keys());
  }
}

// Export singleton container instance
export const container = new DIContainer();

// Service keys as constants for type safety
export const ServiceKeys = {
  // Repositories
  UserRepository: 'UserRepository',
  CourseRepository: 'CourseRepository',
  LessonRepository: 'LessonRepository',
  QuizRepository: 'QuizRepository',
  QuizAttemptRepository: 'QuizAttemptRepository',
  AssignmentRepository: 'AssignmentRepository',
  SubmissionRepository: 'SubmissionRepository',
  EnrollmentRepository: 'EnrollmentRepository',
  
  // Services
  AuthService: 'AuthService',
  UserService: 'UserService',
  CourseService: 'CourseService',
  LessonService: 'LessonService',
  QuizService: 'QuizService',
  AssignmentService: 'AssignmentService',
  EnrollmentService: 'EnrollmentService',
  ProgressService: 'ProgressService',
  
  // Mappers
  UserMapper: 'UserMapper',
  CourseMapper: 'CourseMapper',
  QuizMapper: 'QuizMapper',
  AssignmentMapper: 'AssignmentMapper',
  EnrollmentMapper: 'EnrollmentMapper',
} as const;

export type ServiceKey = typeof ServiceKeys[keyof typeof ServiceKeys];
