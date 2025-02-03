import { Body, Controller, Post } from '@nestjs/common';
import * as EmailValidator from 'email-validator';
const WAValidator = require('multicoin-address-validator');

@Controller('validator')
export class ValidatorController {
    @Post('email')
    async validateEmail(@Body('email') email: string) {
        return EmailValidator.validate(email);
    }

    @Post('address')
    async validateAddress(
      @Body('address') address: string,
      @Body('coin') coin: string,
    ) {
        if (!address || typeof address !== 'string' || address.trim() === '') {
            throw new Error('Invalid address');
        }

        if (!coin || typeof coin !== 'string' || coin.trim() === '') {
            throw new Error('Invalid coin type');
        }

        try {
            return WAValidator.validate(address, coin);
        } catch (error) {
            console.error('Error during address validation:', error);
            throw new Error('Address validation failed');
        }
    }
}
