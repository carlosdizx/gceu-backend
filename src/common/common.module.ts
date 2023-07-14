import { Global, Module } from '@nestjs/common';
import ErrorHandlerService from './utils/error.handler.service';
import EncryptService from './utils/encrypt.service';

@Global()
@Module({
  providers: [ErrorHandlerService, EncryptService],
  exports: [ErrorHandlerService, EncryptService],
})
export class CommonModule {}
