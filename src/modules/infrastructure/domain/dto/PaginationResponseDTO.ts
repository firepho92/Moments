export default interface PaginationResponseDTO<T> {
  currentPage: number,
  from: number,
  to: number,
  perPage: number,
  lastPage: number,
  total: number,
  items: T
}