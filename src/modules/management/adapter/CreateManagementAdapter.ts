import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import IdentityJWT from 'src/utils/auth/IdentityJWT';
import Adapter from 'src/infrastructure/adapter/Adapter';
import UseCase from 'src/infrastructure/useCase/UseCase';
import TenantByUserDto from 'src/domain/dto/admin/TenantByUserDto';
import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';
import CreateSpaceDto from 'src/domain/dto/admin/CreateSpaceDto';

@injectable()
export default class CreateManagementAdapter implements Adapter<string, Promise<TenantByUserDto>> {
  constructor(
    @inject(TYPES.CreateManagementUseCase) private readonly createManagementUseCase: UseCase<CreateSpaceDto, Promise<TenantByUserDto>>,
  ) {}

  async execute(port: string): Promise<TenantByUserDto> {
    const params = new FindQueryDTO<{ email: string }>({ criteria: { email: IdentityJWT.getInstance().email.toString() } });
    const tenantByUserDto = await this.createManagementUseCase.execute({space: port, user: params});
    console.log('CreateManagementAdapter tenantByUserDto', tenantByUserDto);
    return tenantByUserDto;
  }
}