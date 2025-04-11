export const errorResponse = (message: string, error: string, statusCode: number) => ({
  statusCode,
  message,
  error,
}); 