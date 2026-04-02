import { UserEntity, UserRole } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { 
  ILoginDTO, 
  IRegisterDTO, 
  IAuthResponseDTO, 
  IUserResponseDTO,
  IChangePasswordDTO
} from '../dtos/user.dto';
import { IApiResponseDTO } from '../dtos/base.dto';

export interface IAuthService {
  login(dto: ILoginDTO): Promise<IApiResponseDTO<IAuthResponseDTO>>;
  register(dto: IRegisterDTO): Promise<IApiResponseDTO<IAuthResponseDTO>>;
  logout(): Promise<IApiResponseDTO<boolean>>;
  getCurrentUser(): Promise<IApiResponseDTO<IUserResponseDTO>>;
  changePassword(userId: string, dto: IChangePasswordDTO): Promise<IApiResponseDTO<boolean>>;
  validateToken(token: string): Promise<IApiResponseDTO<IUserResponseDTO>>;
}

export class AuthService implements IAuthService {
  private currentUser: UserEntity | null = null;
  private currentToken: string | null = null;

  constructor(
    private userRepository: UserRepository,
    private userMapper: UserMapper
  ) {}

  async login(dto: ILoginDTO): Promise<IApiResponseDTO<IAuthResponseDTO>> {
    try {
      const user = await this.userRepository.authenticate(dto.email, dto.password);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (!user.isActive) {
        return { success: false, error: 'Account is deactivated' };
      }

      // Generate a simple token (in production, use JWT)
      const token = this.generateToken(user);
      this.currentUser = user;
      this.currentToken = token;

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      return {
        success: true,
        data: {
          user: this.userMapper.toResponseDTO(user),
          token,
          expiresAt: expiresAt.toISOString(),
        },
        message: 'Login successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async register(dto: IRegisterDTO): Promise<IApiResponseDTO<IAuthResponseDTO>> {
    try {
      // Validate passwords match
      if (dto.password !== dto.confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
      }

      // Check if email already exists
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing) {
        return { success: false, error: 'Email already registered' };
      }

      // Create user
      const user = this.userMapper.toEntity({
        email: dto.email,
        password: dto.password, // In production, hash this!
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        avatar: dto.avatar,
      });

      await this.userRepository.create(user);

      // Auto login after registration
      const token = this.generateToken(user);
      this.currentUser = user;
      this.currentToken = token;

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      return {
        success: true,
        data: {
          user: this.userMapper.toResponseDTO(user),
          token,
          expiresAt: expiresAt.toISOString(),
        },
        message: 'Registration successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout(): Promise<IApiResponseDTO<boolean>> {
    this.currentUser = null;
    this.currentToken = null;
    return { success: true, data: true, message: 'Logged out successfully' };
  }

  async getCurrentUser(): Promise<IApiResponseDTO<IUserResponseDTO>> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    return {
      success: true,
      data: this.userMapper.toResponseDTO(this.currentUser),
    };
  }

  async changePassword(userId: string, dto: IChangePasswordDTO): Promise<IApiResponseDTO<boolean>> {
    try {
      if (dto.newPassword !== dto.confirmPassword) {
        return { success: false, error: 'New passwords do not match' };
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      if (user.password !== dto.currentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      user.password = dto.newPassword; // In production, hash this!
      user.touch();
      await this.userRepository.update(user);

      return { success: true, data: true, message: 'Password changed successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async validateToken(token: string): Promise<IApiResponseDTO<IUserResponseDTO>> {
    // Simple token validation (in production, verify JWT)
    if (token === this.currentToken && this.currentUser) {
      return {
        success: true,
        data: this.userMapper.toResponseDTO(this.currentUser),
      };
    }
    return { success: false, error: 'Invalid or expired token' };
  }

  // Helper to set current user (for restoring session)
  setCurrentUser(user: UserEntity, token: string): void {
    this.currentUser = user;
    this.currentToken = token;
  }

  private generateToken(user: UserEntity): string {
    // Simple token generation (in production, use JWT)
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now(),
    };
    return btoa(JSON.stringify(payload));
  }

  private handleError<T>(error: unknown): IApiResponseDTO<T> {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return { success: false, error: message };
  }
}
