class ApiError extends Error {
  status;
  message;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}

export default ApiError;
