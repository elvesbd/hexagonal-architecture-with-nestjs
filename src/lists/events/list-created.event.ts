import { Injectable } from '@nestjs/common';
import { List } from '../entities/list.entity';

@Injectable()
export class ListCreatedEvent {
  constructor(public list: List) {}
}
