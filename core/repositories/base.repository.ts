import { IBaseEntity } from '../entities/base.entity';
import { IPaginatedResponseDTO, IPaginationDTO, IFilterDTO } from '../dtos/base.dto';

// Generic Repository Interface
export interface IRepository<T extends IBaseEntity> {
  findAll(filter?: IFilterDTO): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOne(predicate: (item: T) => boolean): Promise<T | null>;
  findMany(predicate: (item: T) => boolean): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  exists(id: string): Promise<boolean>;
  count(predicate?: (item: T) => boolean): Promise<number>;
  paginate(filter: IFilterDTO): Promise<IPaginatedResponseDTO<T>>;
}

// In-memory implementation for development/demo
export abstract class InMemoryRepository<T extends IBaseEntity> implements IRepository<T> {
  protected items: Map<string, T> = new Map();

  async findAll(filter?: IFilterDTO): Promise<T[]> {
    let results = Array.from(this.items.values());
    
    if (filter?.sortBy) {
      results = this.sortItems(results, filter.sortBy, filter.sortOrder ?? 'asc');
    }
    
    return results;
  }

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findOne(predicate: (item: T) => boolean): Promise<T | null> {
    return Array.from(this.items.values()).find(predicate) ?? null;
  }

  async findMany(predicate: (item: T) => boolean): Promise<T[]> {
    return Array.from(this.items.values()).filter(predicate);
  }

  async create(entity: T): Promise<T> {
    this.items.set(entity.id, entity);
    return entity;
  }

  async update(entity: T): Promise<T> {
    if (!this.items.has(entity.id)) {
      throw new Error(`Entity with id ${entity.id} not found`);
    }
    this.items.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.items.has(id);
  }

  async count(predicate?: (item: T) => boolean): Promise<number> {
    if (predicate) {
      return Array.from(this.items.values()).filter(predicate).length;
    }
    return this.items.size;
  }

  async paginate(filter: IFilterDTO): Promise<IPaginatedResponseDTO<T>> {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    
    let results = Array.from(this.items.values());
    
    // Apply search if implemented in subclass
    if (filter.search) {
      results = this.search(results, filter.search);
    }
    
    // Apply sorting
    if (filter.sortBy) {
      results = this.sortItems(results, filter.sortBy, filter.sortOrder ?? 'asc');
    }
    
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = results.slice(startIndex, startIndex + limit);
    
    const pagination: IPaginationDTO = {
      page,
      limit,
      total,
      totalPages,
    };
    
    return {
      data: paginatedData,
      pagination,
    };
  }

  // Override in subclass for custom search logic
  protected search(items: T[], searchTerm: string): T[] {
    return items;
  }

  protected sortItems(items: T[], sortBy: string, order: 'asc' | 'desc'): T[] {
    return [...items].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortBy];
      const bVal = (b as Record<string, unknown>)[sortBy];
      
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return order === 'asc' ? comparison : -comparison;
    });
  }

  // Bulk operations
  async createMany(entities: T[]): Promise<T[]> {
    for (const entity of entities) {
      await this.create(entity);
    }
    return entities;
  }

  async updateMany(entities: T[]): Promise<T[]> {
    for (const entity of entities) {
      await this.update(entity);
    }
    return entities;
  }

  async deleteMany(ids: string[]): Promise<number> {
    let count = 0;
    for (const id of ids) {
      if (await this.delete(id)) count++;
    }
    return count;
  }

  // Clear all data (useful for testing)
  async clear(): Promise<void> {
    this.items.clear();
  }

  // Seed data
  async seed(entities: T[]): Promise<void> {
    await this.createMany(entities);
  }
}
