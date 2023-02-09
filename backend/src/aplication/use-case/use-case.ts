export interface UseCase {
    exec (request: any): Promise<any>
  }