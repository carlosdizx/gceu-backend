import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export default class ErrorHandlerService {
  private readonly logger = new Logger();
  public handleException = (error: any, context = 'AppServiceFailed') => {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    else if (error.code === '23503')
      throw new BadRequestException(error.detail);
    this.logger.error(error, '', context);
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  };
}
