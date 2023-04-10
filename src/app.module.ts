import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './lists/entities/list-model';
import { ListsModule } from './lists/lists.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory',
      autoLoadModels: true,
      models: [ListModel],
      logging: false,
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
