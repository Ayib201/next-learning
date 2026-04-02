import { BaseMapper } from './base.mapper';
import { UserEntity, IUser } from '../entities/user.entity';
import { 
  IUserResponseDTO, 
  IUserProfileDTO,
  ICreateUserDTO, 
  IUpdateUserDTO 
} from '../dtos/user.dto';

export class UserMapper extends BaseMapper<UserEntity, IUserResponseDTO, ICreateUserDTO, IUpdateUserDTO> {
  
  toResponseDTO(entity: UserEntity): IUserResponseDTO {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      role: entity.role,
      avatar: entity.avatar,
      isActive: entity.isActive,
      lastLoginAt: this.formatDate(entity.lastLoginAt),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  toProfileDTO(entity: UserEntity, stats?: { 
    enrolledCourses?: number; 
    completedCourses?: number; 
    averageGrade?: number; 
  }): IUserProfileDTO {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      role: entity.role,
      avatar: entity.avatar,
      ...stats,
    };
  }

  toEntity(dto: ICreateUserDTO): UserEntity {
    return new UserEntity({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      avatar: dto.avatar,
    });
  }

  updateEntity(entity: UserEntity, dto: IUpdateUserDTO): UserEntity {
    if (dto.firstName !== undefined) entity.firstName = dto.firstName;
    if (dto.lastName !== undefined) entity.lastName = dto.lastName;
    if (dto.avatar !== undefined) entity.avatar = dto.avatar;
    if (dto.isActive !== undefined) entity.isActive = dto.isActive;
    entity.touch();
    return entity;
  }

  // Convert raw data to entity
  fromRaw(data: IUser): UserEntity {
    return new UserEntity(data);
  }
}

// Export singleton instance
export const userMapper = new UserMapper();
