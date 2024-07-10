import { BaseException } from './base.exception';

export class UserLoginFailedException extends BaseException {
    constructor() {
        super('User login failed.', 401);
    }
}

export class UserRegistrationFailedException extends BaseException {
    constructor() {
        super('User registration failed.', 500);
    }
}

export class UsersNotFoundException extends BaseException {
    constructor() {
        super('Users not found.', 404);
    }
}

export class UserNotFoundException extends BaseException {
    constructor() {
        super('User not found.', 404);
    }
}

export class UserAlreadyExistsException extends BaseException {
    constructor() {
        super('User already exists.', 400);
    }
}

export class UserInvalidException extends BaseException {
    constructor() {
        super('User is invalid.', 400);
    }
}

export class UserCreationFailedException extends BaseException {
    constructor() {
        super('User creation failed.', 500);
    }
}

export class UserUpdateFailedException extends BaseException {
    constructor() {
        super('User update failed.', 500);
    }
}

export class UserRestoreFailedException extends BaseException {
    constructor() {
        super('User restore failed.', 500);
    }
}

export class UserDeletionFailedException extends BaseException {
    constructor() {
        super('User deletion failed.', 500);
    }
}
