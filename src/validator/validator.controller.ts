import {Body, Controller, Post} from '@nestjs/common';
import * as EmailValidator from 'email-validator';
import {IsEmail, IsNotEmpty, validate} from "class-validator";


const validator = require("email-validator");
var WAValidator = require('multicoin-address-validator');



@Controller('validator')
export class ValidatorController {
    @Post('email')
    async validateEmail(@Body('email') email: string
    ) {
        return EmailValidator.validate(email)
    }

    @Post('address')
    async validateAddress(
        @Body('address') address: string,
        @Body('coin') coin: string,
    ){
        return WAValidator.validate(address, coin);
    }
}
