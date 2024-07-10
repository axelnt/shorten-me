import { BaseException } from './base.exception';

export class UrlsNotFoundException extends BaseException {
    constructor() {
        super('URLs not found.', 404);
    }
}

export class UrlNotFoundException extends BaseException {
    constructor() {
        super('URL not found.', 404);
    }
}

export class UrlAlreadyExistsException extends BaseException {
    constructor() {
        super('URL already exists.', 400);
    }
}

export class UrlInvalidException extends BaseException {
    constructor() {
        super('URL is invalid.', 400);
    }
}

export class UrlCreationFailedException extends BaseException {
    constructor() {
        super('URL creation failed.', 500);
    }
}

export class UrlUpdateFailedException extends BaseException {
    constructor() {
        super('URL update failed.', 500);
    }
}

export class UrlRestoreFailedException extends BaseException {
    constructor() {
        super('URL restore failed.', 500);
    }
}

export class UrlDeletionFailedException extends BaseException {
    constructor() {
        super('URL deletion failed.', 500);
    }
}
