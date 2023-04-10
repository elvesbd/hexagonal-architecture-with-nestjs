import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsController } from './controllers/lists.controller';
import { ListModel } from './entities/list-model';
import { ListsService } from './services/lists.service';
import { ListAdapterSequelize } from './adapters/list-adapter.sequelize';
import { ListAdapterHttp } from './adapters/ list-adapter.http';
import { CreateListInCrmListener } from './listeners/create-list-in-crm.listeners';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    SequelizeModule.forFeature([ListModel]),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    CreateListInCrmListener,
    {
      provide: 'LIST_ADAPTER_SEQUELIZE',
      useClass: ListAdapterSequelize,
    },
    {
      provide: 'LIST_ADAPTER_HTTP',
      useClass: ListAdapterHttp,
    },
    {
      provide: 'EVENT_EMITTER',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
