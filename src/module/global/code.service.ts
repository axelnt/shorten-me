import { Injectable } from '@nestjs/common';
import codeChars from 'src/config/codeChars';

@Injectable()
export class CodeService {
    constructor() {}

    private chars = codeChars;

    generateRandomCode(length = 7, characters = this.chars): string {
        let code = '';

        for (let i = 0; i < length; i++) {
            code += characters.charAt(
                Math.floor(Math.random() * characters.length),
            );
        }

        return code;
    }
}
