import { HttpException } from '@nestjs/common';

export type APIResponse<T> = {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    timestamp: number;
};

export class ResponseBuilder {
    private response: APIResponse<any>;
    private responseCode?: number = 200;

    constructor() {
        this.response = {
            status: 'success',
            timestamp: Date.now(),
        };
    }

    public get = <T>(): APIResponse<T> => {
        this.response.timestamp = Date.now();

        return this.response;
    };

    public build = <T>(): APIResponse<T> => {
        this.response.timestamp = Date.now();

        if (this.responseCode === 200) return this.get();

        throw new HttpException(this.response, this.responseCode);
    };

    public throw = (): never => {
        this.response.timestamp = Date.now();

        throw new HttpException(this.response, this.responseCode);
    };

    public code = (code: number): ResponseBuilder => {
        this.responseCode = code;
        return this;
    };

    public message = (message: string): ResponseBuilder => {
        this.response.message = message;
        return this;
    };

    public data = <T>(data: T): ResponseBuilder => {
        this.response.data = data;
        return this;
    };

    public success = <T>(data?: T, message?: string): ResponseBuilder => {
        this.response.status = 'success';
        this.response.data = data;
        this.response.message = message;
        this.responseCode = 200;
        return this;
    };

    public successWithoutMessage = <T>(data?: T): ResponseBuilder => {
        return this.success(data, undefined);
    };

    public successWithoutData = (message?: string): ResponseBuilder => {
        return this.success(undefined, message);
    };

    public error = <T>(data?: T, message?: string): ResponseBuilder => {
        this.response.status = 'error';
        this.response.data = data;
        this.response.message = message;
        this.responseCode = 500;
        return this;
    };

    public errorWithoutData = (message?: string): ResponseBuilder => {
        return this.error(undefined, message);
    };

    public errorWithoutMessage = <T>(data?: T): ResponseBuilder => {
        return this.error(data);
    };
}
