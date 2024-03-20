
class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

export class BadRequestError extends CustomError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}