
export const successResponse = (
  data: any,
  message: string = 'Request processed successfully',
  statusCode: number = 200,
) => {
  return {
  statusCode,
  status: true,
  message: message,
  data: data,
};
};

export const errorResponse = (
  error: any,
  message: string = 'An error occurred',
  statusCode: number = 400,
) => {
  return {
    statusCode: statusCode,
    status: false,
    message: error,
    data: null,
  };
};