import { BaseService } from './base.service';
import { UserEntity, UserRole } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import {
  IUserResponseDTO,
  IUserProfileDTO,
  ICreateUserDTO,
  IUpdateUserDTO,
  IUserFilterDTO,
} from '../dtos/user.dto';
import { IApiResponseDTO, IPaginatedResponseDTO } from '../dtos/base.dto';

export interface IUserService {
  getProfile(userId: string): Promise<IApiResponseDTO<IUserProfileDTO>>;
  getUsersByRole(role: UserRole): Promise<IApiResponseDTO<IUserResponseDTO[]>>;
  getTeachers(): Promise<IApiResponseDTO<IUserResponseDTO[]>>;
  getStudents(): Promise<IApiResponseDTO<IUserResponseDTO[]>>;
  searchUsers(filter: IUserFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<IUserResponseDTO>>>;
  deactivateUser(userId: string): Promise<IApiResponseDTO<boolean>>;
  activateUser(userId: string): Promise<IApiResponseDTO<boolean>>;
}

export class UserService 
  extends BaseService<UserEntity, IUserResponseDTO, ICreateUserDTO, IUpdateUserDTO>
  implements IUserService {

  constructor(
    protected userRepository: UserRepository,
    protected userMapper: UserMapper
  ) {
    super(userRepository, userMapper);
  }

  async getProfile(userId: string): Promise<IApiResponseDTO<IUserProfileDTO>> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      // In a real app, fetch actual stats from enrollment service
      const profile = this.userMapper.toProfileDTO(user, {
        enrolledCourses: 0,
        completedCourses: 0,
        averageGrade: 0,
      });
      
      return { success: true, data: profile };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUsersByRole(role: UserRole): Promise<IApiResponseDTO<IUserResponseDTO[]>> {
    try {
      const users = await this.userRepository.findByRole(role);
      const dtos = this.userMapper.toResponseDTOList(users);
      return { success: true, data: dtos };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTeachers(): Promise<IApiResponseDTO<IUserResponseDTO[]>> {
    return this.getUsersByRole('teacher');
  }

  async getStudents(): Promise<IApiResponseDTO<IUserResponseDTO[]>> {
    return this.getUsersByRole('student');
  }

  async searchUsers(filter: IUserFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<IUserResponseDTO>>> {
    try {
      const result = await this.userRepository.paginateWithFilter(filter);
      const dtos = this.userMapper.toResponseDTOList(result.data);
      return {
        success: true,
        data: {
          data: dtos,
          pagination: result.pagination,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deactivateUser(userId: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      user.isActive = false;
      user.touch();
      await this.userRepository.update(user);
      
      return { success: true, data: true, message: 'User deactivated' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async activateUser(userId: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      user.isActive = true;
      user.touch();
      await this.userRepository.update(user);
      
      return { success: true, data: true, message: 'User activated' };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
