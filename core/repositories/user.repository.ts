import { InMemoryRepository } from './base.repository';
import { UserEntity, UserRole } from '../entities/user.entity';
import { IUserFilterDTO } from '../dtos/user.dto';
import { IPaginatedResponseDTO } from '../dtos/base.dto';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findByRole(role: UserRole): Promise<UserEntity[]>;
  findActiveUsers(): Promise<UserEntity[]>;
  authenticate(email: string, password: string): Promise<UserEntity | null>;
}

export class UserRepository extends InMemoryRepository<UserEntity> implements IUserRepository {

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne(user => user.email.toLowerCase() === email.toLowerCase());
  }

  async findByRole(role: UserRole): Promise<UserEntity[]> {
    return this.findMany(user => user.role === role);
  }

  async findActiveUsers(): Promise<UserEntity[]> {
    return this.findMany(user => user.isActive);
  }

  async authenticate(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.findByEmail(email);
    if (user && user.password === password && user.isActive) {
      user.lastLoginAt = new Date();
      await this.update(user);
      return user;
    }
    return null;
  }

  async paginateWithFilter(filter: IUserFilterDTO): Promise<IPaginatedResponseDTO<UserEntity>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    // Apply filters
    if (filter.role) {
      results = results.filter(u => u.role === filter.role);
    }
    if (filter.isActive !== undefined) {
      results = results.filter(u => u.isActive === filter.isActive);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      results = results.filter(u => 
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
      );
    }
    
    // Apply sorting
    if (filter.sortBy) {
      results = this.sortItems(results, filter.sortBy, filter.sortOrder ?? 'asc');
    }
    
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = results.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedData,
      pagination: { page, limit, total, totalPages },
    };
  }

  protected search(items: UserEntity[], searchTerm: string): UserEntity[] {
    const term = searchTerm.toLowerCase();
    return items.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }
}

// Singleton instance
export const userRepository = new UserRepository();
