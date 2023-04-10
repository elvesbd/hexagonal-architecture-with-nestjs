import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ListAdapterHttp } from '../adapters/ list-adapter.http';
import { ListCreatedEvent } from '../events/list-created.event';

@Injectable()
export class CreateListInCrmListener {
  constructor(
    @Inject('LIST_ADAPTER_HTTP')
    private readonly listAdapterHttp: ListAdapterHttp,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    this.listAdapterHttp.create(event.list);
  }
}
