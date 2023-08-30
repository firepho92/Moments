export enum ApplicationMode {
  LOCAL = 'local',
  STAGED = 'staged'
}

export default class EnvironmentHelper {
  public static readonly STAGE: string = process.env.IS_OFFLINE ? 'local' : process.env.STAGE ?? 'local'
  public static readonly MODE: string = process.env.IS_OFFLINE ? ApplicationMode.LOCAL : ApplicationMode.STAGED
  public static readonly DB_POSTGRES_USERNAME = process.env.DB_POSTGRES_USERNAME ?? 'postgres'
  public static readonly DB_POSTGRES_PASSWORD = process.env.DB_POSTGRES_PASSWORD ?? '123456'
  public static readonly DB_POSTGRES_HOST = process.env.DB_POSTGRES_HOST ?? 'localhost'
  public static readonly DB_POSTGRES_PORT = process.env.DB_POSTGRES_PORT ?? '5432'
  public static readonly REGION = process.env.REGION ?? 'us-east-1'
  public static readonly DB_POSTGRES_NAME = process.env.DB_POSTGRES_NAME ?? 'architecture'
  public static readonly SECRET_NAME = process.env.SecretDBName ?? 'SecretDBName'
}