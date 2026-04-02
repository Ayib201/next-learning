import { Routes, Route, Navigate } from 'react-router'

// Layouts
import StudentLayout from '@/components/layouts/StudentLayout'
import TeacherLayout from '@/components/layouts/TeacherLayout'

// Pages
import Home from '@/pages/Home'

// Student pages
import StudentDashboard from '@/pages/student/Dashboard'
import StudentCourses from '@/pages/student/Courses'
import StudentQuizzes from '@/pages/student/Quizzes'
import StudentAssignments from '@/pages/student/Assignments'
import StudentProgress from '@/pages/student/Progress'
import StudentSettings from '@/pages/student/Settings'

// Teacher pages
import TeacherDashboard from '@/pages/teacher/Dashboard'
import TeacherCourses from '@/pages/teacher/Courses'
import TeacherQuizzes from '@/pages/teacher/Quizzes'
import TeacherStudents from '@/pages/teacher/Students'
import TeacherGrading from '@/pages/teacher/Grading'
import TeacherAnalytics from '@/pages/teacher/Analytics'
import TeacherSettings from '@/pages/teacher/Settings'

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Student routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="quizzes" element={<StudentQuizzes />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Teacher routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="quizzes" element={<TeacherQuizzes />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="grading" element={<TeacherGrading />} />
        <Route path="analytics" element={<TeacherAnalytics />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* 404 - Redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
