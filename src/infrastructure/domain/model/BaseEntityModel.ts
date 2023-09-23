export default interface BaseEntityModel {
  id?: string;
  createdAt?: Date;
  createdBy?: string;
  lastUpdatedAt?: Date;
  lastUpdatedBy?: string;
  active?: boolean;
}