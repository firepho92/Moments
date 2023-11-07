import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';

export default class CreateSpaceDto {
  space: string;
  user: FindQueryDTO<{ email: string }>;
}