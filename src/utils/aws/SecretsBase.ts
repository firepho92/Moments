export default interface SecretsBase {
  retrieveSecretValue<T>(secretName: string): Promise<T>;

  createSecret<T>(secretName: string, secretValue: T): Promise<void>;
}