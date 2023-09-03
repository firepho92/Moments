export default interface UseCase<T, U> {
  execute(port?: T): U;
}