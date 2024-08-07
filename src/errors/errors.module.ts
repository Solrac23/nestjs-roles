import { Module } from '@nestjs/common';
import { ErrorsService } from './errors.service';

@Module({
  providers: [ErrorsService],
})
export class ErrorsModule {}
