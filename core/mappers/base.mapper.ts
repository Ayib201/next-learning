// Base Mapper Interface
export interface IMapper<Entity, ResponseDTO, CreateDTO, UpdateDTO = Partial<CreateDTO>> {
  toResponseDTO(entity: Entity): ResponseDTO;
  toResponseDTOList(entities: Entity[]): ResponseDTO[];
  toEntity(dto: CreateDTO): Entity;
  updateEntity(entity: Entity, dto: UpdateDTO): Entity;
}

// Abstract base mapper with common functionality
export abstract class BaseMapper<Entity, ResponseDTO, CreateDTO, UpdateDTO = Partial<CreateDTO>>
  implements IMapper<Entity, ResponseDTO, CreateDTO, UpdateDTO> {
  
  abstract toResponseDTO(entity: Entity): ResponseDTO;
  abstract toEntity(dto: CreateDTO): Entity;
  abstract updateEntity(entity: Entity, dto: UpdateDTO): Entity;

  toResponseDTOList(entities: Entity[]): ResponseDTO[] {
    return entities.map(entity => this.toResponseDTO(entity));
  }

  // Helper to format dates
  protected formatDate(date: Date | undefined): string | undefined {
    return date?.toISOString();
  }

  // Helper to parse dates
  protected parseDate(dateString: string | undefined): Date | undefined {
    return dateString ? new Date(dateString) : undefined;
  }

  // Helper to safely assign partial updates
  protected assignDefined<T extends object>(target: T, source: Partial<T>): T {
    Object.keys(source).forEach(key => {
      const value = (source as Record<string, unknown>)[key];
      if (value !== undefined) {
        (target as Record<string, unknown>)[key] = value;
      }
    });
    return target;
  }
}
