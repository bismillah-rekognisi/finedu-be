export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

// ----- Common Errors -----
export class NotFoundErr extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class EmailNotVerifiedError extends UnauthorizedError {
    constructor(message = "Email not verified") {
        super(message);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403, true);
    }
}

export class InvalidCredentialsError extends UnauthorizedError {
    constructor() {
        super("Invalid email or password");
    }
}