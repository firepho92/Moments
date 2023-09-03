import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import Adapter from 'src/infrastructure/adapter/Adapter';
import TenantByUserDto from 'src/domain/dto/admin/TenantByUserDto';
import UseCase from 'src/infrastructure/useCase/UseCase';
import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';
import IdentityJWT from 'src/utils/auth/IdentityJWT';

@injectable()
export default class CreateManagementAdapter implements Adapter<FindQueryDTO<{ email: string }>, Promise<TenantByUserDto>> {
  constructor(
    @inject(TYPES.CreateManagementUseCase) private readonly createManagementUseCase: UseCase<FindQueryDTO<{ email: string }>, Promise<TenantByUserDto>>,
  ) {}

  async execute(): Promise<TenantByUserDto> {
    const params = new FindQueryDTO<{ email: string }>({ criteria: { email: IdentityJWT.getInstance().email.toString() } });
    const tenantByUserDto = await this.createManagementUseCase.execute(params);
    console.log('CreateManagementAdapter tenantByUserDto', tenantByUserDto);
    return tenantByUserDto;
  }
}