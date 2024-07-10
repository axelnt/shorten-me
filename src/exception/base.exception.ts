export class BaseException extends Error {
    code: number;

    constructor(message = 'An error occurred', code = 500) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
