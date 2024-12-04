import { Injectable, Logger } from '@nestjs/common';
import { TCreateOrderDto } from 'apps/orders/src/dto/create-order.dto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  async bill(dto: TCreateOrderDto) {
    this.logger.log('Billing with', dto);
  }
}
