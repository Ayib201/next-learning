import { IBaseEntity } from '../entities/base.entity';
import { IRepository } from '../repositories/base.repository';
import { IMapper } from '../mappers/base.mapper';
import { IPaginatedResponseDTO, IFilterDTO, IApiResponseDTO } from '../dtos/base.dto';

// Base service interface
export interface IBaseService<
  Entity extends IBaseEntity,
  ResponseDTO,
  CreateDTO,
  UpdateDTO
> {
  getAll(filter?: IFilterDTO): Promise<IApiResponseDTO<ResponseDTO[]>>;
  getById(id: string): Promise<IApiResponseDTO<ResponseDTO>>;
  create(dto: CreateDTO): Promise<IApiResponseDTO<ResponseDTO>>;
  update(id: string, dto: UpdateDTO): Promise<IApiResponseDTO<ResponseDTO>>;
  delete(id: string): Promise<IApiResponseDTO<boolean>>;
  paginate(filter: IFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<ResponseDTO>>>;
}

// Abstract base service with common CRUD operations
export abstract class BaseService<
  Entity extends IBaseEntity,
  ResponseDTO,
  CreateDTO,
  UpdateDTO
> implements IBaseService<Entity, ResponseDTO, CreateDTO, UpdateDTO> {

  constructor(
    protected repository: IRepository<Entity>,
    protected mapper: IMapper<Entity, ResponseDTO, CreateDTO, UpdateDTO>
  ) {}

  async getAll(filter?: IFilterDTO): Promise<IApiResponseDTO<ResponseDTO[]>> {
    try {
      const entities = await this.repository.findAll(filter);
      const dtos = this.mapper.toResponseDTOList(entities);
      return { success: true, data: dtos };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id: string): Promise<IApiResponseDTO<ResponseDTO>> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        return { success: false, error: 'Entity not found' };
      }
      const dto = this.mapper.toResponseDTO(entity);
      return { success: true, data: dto };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(dto: CreateDTO): Promise<IApiResponseDTO<ResponseDTO>> {
    try {
      const entity = this.mapper.toEntity(dto);
      const created = await this.repository.create(entity);
      const responseDTO = this.mapper.toResponseDTO(created);
      return { success: true, data: responseDTO, message: 'Created successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateDTO): Promise<IApiResponseDTO<ResponseDTO>> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        return { success: false, error: 'Entity not found' };
      }
      const updated = this.mapper.updateEntity(entity, dto);
      await this.repository.update(updated);
      const responseDTO = this.mapper.toResponseDTO(updated);
      return { success: true, data: responseDTO, message: 'Updated successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<IApiResponseDTO<boolean>> {
    try {
      const exists = await this.repository.exists(id);
      if (!exists) {
        return { success: false, error: 'Entity not found' };
      }
      const deleted = await this.repository.delete(id);
      return { success: true, data: deleted, message: 'Deleted successfully' };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async paginate(filter: IFilterDTO): Promise<IApiResponseDTO<IPaginatedResponseDTO<ResponseDTO>>> {
    try {
      const result = await this.repository.paginate(filter);
      const dtos = this.mapper.toResponseDTOList(result.data);
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

  protected handleError<T>(error: unknown): IApiResponseDTO<T> {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Service error:', error);
    return { success: false, error: message };
  }
}
