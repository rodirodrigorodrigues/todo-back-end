export class AppError extends Error {
  public status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    // Mantém o stack trace correto
    Error.captureStackTrace(this, this.constructor);
  }
}
