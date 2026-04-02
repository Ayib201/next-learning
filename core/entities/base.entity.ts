// Base Entity - All entities inherit from this
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseEntity implements IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<IBaseEntity>) {
    this.id = data?.id ?? crypto.randomUUID();
    this.createdAt = data?.createdAt ?? new Date();
    this.updatedAt = data?.updatedAt ?? new Date();
  }

  touch(): void {
    this.updatedAt = new Date();
  }
}
