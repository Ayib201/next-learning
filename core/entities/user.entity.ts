import { BaseEntity, IBaseEntity } from './base.entity';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

export class UserEntity extends BaseEntity implements IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;

  constructor(data: Partial<IUser>) {
    super(data);
    this.email = data.email ?? '';
    this.password = data.password ?? '';
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.role = data.role ?? 'student';
    this.avatar = data.avatar;
    this.isActive = data.isActive ?? true;
    this.lastLoginAt = data.lastLoginAt;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isStudent(): boolean {
    return this.role === 'student';
  }

  isTeacher(): boolean {
    return this.role === 'teacher';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
