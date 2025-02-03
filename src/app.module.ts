import { Module } from '@nestjs/common';
import { ValidatorController } from './validator/validator.controller';
import { ValidatorService } from './validator/validator.service';
import { HttpModule } from "@nestjs/axios";
import { CoinsController } from "./coins/coins.controller";
import { CoinsService } from "./coins/coins.service";

@Module({
  imports: [HttpModule],
  controllers: [CoinsController, ValidatorController],
  providers: [CoinsService, ValidatorService],
})
export class AppModule {
}
