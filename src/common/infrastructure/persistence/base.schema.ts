import { EntitySchemaColumnOptions } from 'typeorm';

type EntitySchemaColumns = {
  [key: string]: EntitySchemaColumnOptions;
};

export const withBaseSchemaColumns = (
  columns: EntitySchemaColumns,
): EntitySchemaColumns => ({
  id: { type: 'int', primary: true, generated: true },
  ...columns,
  createdAt: { type: Date, createDate: true },
  updatedAt: { type: Date, updateDate: true },
  deletedAt: { type: Date, deleteDate: true },
});
