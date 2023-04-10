import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from '../dto/create-list.dto';
import { ListGateway } from '../gateways/list-gateway.interface';
import EventEmitter from 'events';
import { ListCreatedEvent } from '../events/list-created.event';

@Injectable()
export class ListsService {
  constructor(
    @Inject('LIST_ADAPTER_SEQUELIZE')
    private readonly listAdapterSquelize: ListGateway,
    @Inject('LIST_ADAPTER_HTTP')
    private readonly listAdapterHttp: ListGateway /* @Inject('EVENT_EMITTER')
    private readonly eventEmitter: EventEmitter, */,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = await this.listAdapterSquelize.create(createListDto);
    await this.listAdapterHttp.create(createListDto);
    // this.eventEmitter.emit('list.created', new ListCreatedEvent(list));
    return list;
  }

  async findAll() {
    return await this.listAdapterSquelize.findAll();
  }

  async findOne(id: number) {
    const list = await this.listAdapterSquelize.findById(id);
    if (!list) {
      throw new NotFoundException();
    }
    return list;
  }
}
