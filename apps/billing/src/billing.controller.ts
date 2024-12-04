import { JwtAuthGuard, ORDERS_CREATED, RmqService } from '@app/common';
import { Controller, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { TCreateOrderDto } from 'apps/orders/src/dto/create-order.dto';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(ORDERS_CREATED)
  @UseGuards(JwtAuthGuard)
  async handleOrdersCreated(
    @Payload() payload: { dto: TCreateOrderDto; Authentication: string },
    @Ctx() ctx: RmqContext,
  ) {
    await this.billingService.bill(payload.dto);
    this.rmqService.acknowledge(ctx);
  }
}
