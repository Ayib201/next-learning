import { IBaseDTO, IFilterDTO } from './base.dto';
import { UserRole } from '../entities/user.entity';

// Response DTOs (what we send to client)
export interface IUserResponseDTO extends IBaseDTO {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface IUserProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  enrolledCourses?: number;
  completedCourses?: number;
  averageGrade?: number;
}

// Request DTOs (what we receive from client)
export interface ICreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export interface IUpdateUserDTO {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IRegisterDTO extends ICreateUserDTO {
  confirmPassword: string;
}

export interface IChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Filter DTOs
export interface IUserFilterDTO extends IFilterDTO {
  role?: UserRole;
  isActive?: boolean;
}

// Auth Response
export interface IAuthResponseDTO {
  user: IUserResponseDTO;
  token: string;
  expiresAt: string;
}
