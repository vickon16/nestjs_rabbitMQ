import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE, ORDERS_CREATED } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {}

  async createOrder(dto: CreateOrderDto, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(dto, { session });
      await lastValueFrom(
        this.billingClient.emit(ORDERS_CREATED, {
          dto,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
