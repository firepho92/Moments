import 'reflect-metadata';
import { injectable } from 'inversify';
import SecretsBase from './SecretsBase';
import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandInput, CreateSecretCommandInput, CreateSecretCommand } from '@aws-sdk/client-secrets-manager';

@injectable()
export default class SecretsManager implements SecretsBase {
  private secretsManagerClient: SecretsManagerClient;

  constructor(
    region = process.env.REGION,
  ) {
    this.secretsManagerClient = new SecretsManagerClient({ region });
  }

  async createSecret<T>(secretName: string, secretValue: T): Promise<void> {
    const commandInput: CreateSecretCommandInput = {
      Name: secretName,
      SecretString: JSON.stringify(secretValue)
    }
    console.log('secret creation: ', await this.secretsManagerClient.send(new CreateSecretCommand(commandInput)));
  }

  async retrieveSecretValue<T>(secretName: string): Promise<T> {
    const commandInput: GetSecretValueCommandInput = {
      SecretId: secretName
    }

    const secret = await this.secretsManagerClient.send(new GetSecretValueCommand(commandInput));
    const secretValue = JSON.parse(secret.SecretString);
    return {
      ...secretValue,
      database: secretValue.dbname
    };
  }
  
}