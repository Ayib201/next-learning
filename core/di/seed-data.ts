import { container, ServiceKeys } from './container';
import { UserRepository } from '../repositories/user.repository';
import { CourseRepository } from '../repositories/course.repository';
import { LessonRepository } from '../repositories/lesson.repository';
import { QuizRepository } from '../repositories/quiz.repository';
import { AssignmentRepository } from '../repositories/assignment.repository';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { UserEntity } from '../entities/user.entity';
import { CourseEntity } from '../entities/course.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { QuizEntity } from '../entities/quiz.entity';
import { AssignmentEntity } from '../entities/assignment.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';

export async function seedDemoData(): Promise<void> {
  const userRepo = container.resolve<UserRepository>(ServiceKeys.UserRepository);
  const courseRepo = container.resolve<CourseRepository>(ServiceKeys.CourseRepository);
  const lessonRepo = container.resolve<LessonRepository>(ServiceKeys.LessonRepository);
  const quizRepo = container.resolve<QuizRepository>(ServiceKeys.QuizRepository);
  const assignmentRepo = container.resolve<AssignmentRepository>(ServiceKeys.AssignmentRepository);
  const enrollmentRepo = container.resolve<EnrollmentRepository>(ServiceKeys.EnrollmentRepository);

  // Create Teachers
  const teacher1 = new UserEntity({
    id: 'teacher-1',
    email: 'prof.martin@isi.edu',
    password: 'password123',
    firstName: 'Jean',
    lastName: 'Martin',
    role: 'teacher',
    avatar: '/avatars/teacher1.jpg',
  });

  const teacher2 = new UserEntity({
    id: 'teacher-2',
    email: 'prof.dubois@isi.edu',
    password: 'password123',
    firstName: 'Marie',
    lastName: 'Dubois',
    role: 'teacher',
    avatar: '/avatars/teacher2.jpg',
  });

  await userRepo.createMany([teacher1, teacher2]);

  // Create Students
  const students = [
    new UserEntity({
      id: 'student-1',
      email: 'ahmed.benali@isi.edu',
      password: 'password123',
      firstName: 'Ahmed',
      lastName: 'Benali',
      role: 'student',
    }),
    new UserEntity({
      id: 'student-2',
      email: 'sara.khelifi@isi.edu',
      password: 'password123',
      firstName: 'Sara',
      lastName: 'Khelifi',
      role: 'student',
    }),
    new UserEntity({
      id: 'student-3',
      email: 'youssef.hamdi@isi.edu',
      password: 'password123',
      firstName: 'Youssef',
      lastName: 'Hamdi',
      role: 'student',
    }),
  ];

  await userRepo.createMany(students);

  // Create Courses
  const courses = [
    new CourseEntity({
      id: 'course-1',
      title: 'Introduction à la Programmation Python',
      description: 'Apprenez les bases de la programmation avec Python, le langage le plus populaire pour les débutants.',
      shortDescription: 'Maîtrisez Python de zéro à héros',
      teacherId: 'teacher-1',
      category: 'informatique',
      level: 'beginner',
      status: 'published',
      thumbnail: '/courses/python.jpg',
      duration: 40,
      totalLessons: 12,
      enrolledCount: 156,
      rating: 4.8,
      tags: ['python', 'programmation', 'débutant'],
    }),
    new CourseEntity({
      id: 'course-2',
      title: 'Développement Web avec React',
      description: 'Créez des applications web modernes avec React, le framework JavaScript le plus demandé.',
      shortDescription: 'Construisez des interfaces dynamiques',
      teacherId: 'teacher-1',
      category: 'informatique',
      level: 'intermediate',
      status: 'published',
      thumbnail: '/courses/react.jpg',
      duration: 60,
      totalLessons: 20,
      enrolledCount: 98,
      rating: 4.9,
      tags: ['react', 'javascript', 'web'],
    }),
    new CourseEntity({
      id: 'course-3',
      title: 'Bases de Données SQL',
      description: 'Maîtrisez SQL et apprenez à concevoir et gérer des bases de données relationnelles.',
      shortDescription: 'Devenez expert en SQL',
      teacherId: 'teacher-2',
      category: 'informatique',
      level: 'beginner',
      status: 'published',
      thumbnail: '/courses/sql.jpg',
      duration: 35,
      totalLessons: 15,
      enrolledCount: 124,
      rating: 4.7,
      tags: ['sql', 'database', 'mysql'],
    }),
    new CourseEntity({
      id: 'course-4',
      title: 'Intelligence Artificielle et Machine Learning',
      description: 'Découvrez les fondamentaux de l\'IA et du Machine Learning avec des projets pratiques.',
      shortDescription: 'Explorez le monde de l\'IA',
      teacherId: 'teacher-2',
      category: 'informatique',
      level: 'advanced',
      status: 'published',
      thumbnail: '/courses/ai.jpg',
      duration: 80,
      totalLessons: 25,
      enrolledCount: 87,
      rating: 4.9,
      tags: ['ia', 'machine-learning', 'python'],
    }),
  ];

  await courseRepo.createMany(courses);

  // Create Lessons for Python Course
  const pythonLessons = [
    new LessonEntity({
      id: 'lesson-1-1',
      courseId: 'course-1',
      title: 'Introduction et Installation',
      description: 'Découvrez Python et installez votre environnement de développement.',
      type: 'video',
      order: 1,
      duration: 30,
      isPublished: true,
      isFree: true,
      content: [{ type: 'video', url: '/videos/python-intro.mp4', title: 'Introduction' }],
    }),
    new LessonEntity({
      id: 'lesson-1-2',
      courseId: 'course-1',
      title: 'Variables et Types de Données',
      description: 'Apprenez à manipuler les variables et les différents types de données.',
      type: 'video',
      order: 2,
      duration: 45,
      isPublished: true,
      isFree: false,
      content: [{ type: 'video', url: '/videos/python-variables.mp4', title: 'Variables' }],
    }),
    new LessonEntity({
      id: 'lesson-1-3',
      courseId: 'course-1',
      title: 'Structures de Contrôle',
      description: 'Maîtrisez les conditions et les boucles en Python.',
      type: 'video',
      order: 3,
      duration: 50,
      isPublished: true,
      isFree: false,
      content: [{ type: 'video', url: '/videos/python-control.mp4', title: 'Contrôle' }],
    }),
    new LessonEntity({
      id: 'lesson-1-4',
      courseId: 'course-1',
      title: 'Fonctions',
      description: 'Créez et utilisez des fonctions pour organiser votre code.',
      type: 'video',
      order: 4,
      duration: 55,
      isPublished: true,
      isFree: false,
      content: [{ type: 'video', url: '/videos/python-functions.mp4', title: 'Fonctions' }],
    }),
  ];

  await lessonRepo.createMany(pythonLessons);

  // Create Quizzes
  const quiz1 = new QuizEntity({
    id: 'quiz-1',
    courseId: 'course-1',
    lessonId: 'lesson-1-2',
    title: 'Quiz - Variables et Types',
    description: 'Testez vos connaissances sur les variables Python',
    duration: 15,
    passingScore: 70,
    maxAttempts: 3,
    isPublished: true,
    shuffleQuestions: true,
    shuffleOptions: true,
    showCorrectAnswers: true,
    questions: [
      {
        id: 'q1',
        question: 'Quel type de données est "Hello World" en Python?',
        type: 'single',
        options: [
          { id: 'o1', text: 'int', isCorrect: false },
          { id: 'o2', text: 'str', isCorrect: true },
          { id: 'o3', text: 'bool', isCorrect: false },
          { id: 'o4', text: 'list', isCorrect: false },
        ],
        points: 10,
        explanation: 'Les chaînes de caractères sont de type str en Python.',
      },
      {
        id: 'q2',
        question: 'Comment déclarer une variable x avec la valeur 10?',
        type: 'single',
        options: [
          { id: 'o1', text: 'var x = 10', isCorrect: false },
          { id: 'o2', text: 'int x = 10', isCorrect: false },
          { id: 'o3', text: 'x = 10', isCorrect: true },
          { id: 'o4', text: 'let x = 10', isCorrect: false },
        ],
        points: 10,
        explanation: 'Python utilise le typage dynamique, pas besoin de déclarer le type.',
      },
      {
        id: 'q3',
        question: 'True et False sont de quel type?',
        type: 'single',
        options: [
          { id: 'o1', text: 'str', isCorrect: false },
          { id: 'o2', text: 'int', isCorrect: false },
          { id: 'o3', text: 'bool', isCorrect: true },
          { id: 'o4', text: 'float', isCorrect: false },
        ],
        points: 10,
        explanation: 'True et False sont des valeurs booléennes (bool).',
      },
    ],
  });

  await quizRepo.create(quiz1);

  // Create Assignments
  const assignment1 = new AssignmentEntity({
    id: 'assignment-1',
    courseId: 'course-1',
    title: 'Projet Python - Calculatrice',
    description: 'Créez une calculatrice simple en Python',
    instructions: 'Créez un programme Python qui peut effectuer les opérations de base (+, -, *, /).\n\nExigences:\n- Interface en ligne de commande\n- Gestion des erreurs\n- Documentation du code',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    maxPoints: 100,
    allowLateSubmission: true,
    latePenalty: 10,
    status: 'published',
    allowedFileTypes: ['.py', '.zip'],
    maxFileSize: 5,
  });

  const assignment2 = new AssignmentEntity({
    id: 'assignment-2',
    courseId: 'course-1',
    title: 'Exercices - Structures de Contrôle',
    description: 'Exercices pratiques sur les conditions et boucles',
    instructions: 'Résolvez les 5 exercices fournis en utilisant les structures de contrôle Python.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    maxPoints: 50,
    allowLateSubmission: false,
    status: 'published',
    allowedFileTypes: ['.py'],
    maxFileSize: 2,
  });

  await assignmentRepo.createMany([assignment1, assignment2]);

  // Create Enrollments
  const enrollments = [
    new EnrollmentEntity({
      id: 'enrollment-1',
      courseId: 'course-1',
      studentId: 'student-1',
      status: 'active',
      progress: 50,
      lessonsProgress: [
        { lessonId: 'lesson-1-1', completed: true, completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        { lessonId: 'lesson-1-2', completed: true, completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { lessonId: 'lesson-1-3', completed: false },
        { lessonId: 'lesson-1-4', completed: false },
      ],
    }),
    new EnrollmentEntity({
      id: 'enrollment-2',
      courseId: 'course-2',
      studentId: 'student-1',
      status: 'active',
      progress: 25,
      lessonsProgress: [],
    }),
    new EnrollmentEntity({
      id: 'enrollment-3',
      courseId: 'course-1',
      studentId: 'student-2',
      status: 'active',
      progress: 75,
      lessonsProgress: [
        { lessonId: 'lesson-1-1', completed: true },
        { lessonId: 'lesson-1-2', completed: true },
        { lessonId: 'lesson-1-3', completed: true },
        { lessonId: 'lesson-1-4', completed: false },
      ],
    }),
  ];

  await enrollmentRepo.createMany(enrollments);

  console.log('[v0] Demo data seeded successfully');
}
