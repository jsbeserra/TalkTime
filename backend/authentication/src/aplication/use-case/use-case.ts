export interface UseCase {
  handle(request: any): Promise<any>
}